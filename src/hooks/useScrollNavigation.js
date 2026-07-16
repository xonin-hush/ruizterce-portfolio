import { useState, useEffect, useRef, useCallback } from "react";
import { scroller } from "react-scroll";

const SCROLL_DURATION = 450; // section animation, ms
const COOLDOWN = 450; // minimum gap between section changes, ms
const GESTURE_GAP = 200; // a pause this long starts a fresh gesture sample, ms

// Mean of the last `count` samples (fewer if the buffer is shorter).
const average = (values, count) => {
  const n = Math.min(values.length, count);
  if (n === 0) return 0;
  let sum = 0;
  for (let i = values.length - n; i < values.length; i += 1) {
    sum += values[i];
  }
  return sum / n;
};

const useScrollNavigation = (sections, initialIndex = 0) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialIndex);

  // Refs persist across renders, so a section change never resets the state.
  const lockRef = useRef(false); // brief cooldown after a section change
  const samplesRef = useRef([]); // recent |deltaY| values, for momentum detection
  const prevTimeRef = useRef(0);
  const prevDirRef = useRef(0);

  const scrollToSection = useCallback((index) => {
    lockRef.current = true;
    setCurrentSectionIndex(index);
    setTimeout(() => {
      lockRef.current = false;
    }, COOLDOWN);
  }, []);

  // Animate to the active section whenever it changes (wheel, touch, or dots).
  useEffect(() => {
    scroller.scrollTo(sections[currentSectionIndex], {
      duration: SCROLL_DURATION,
      smooth: "easeInOutQuad",
    });
  }, [currentSectionIndex, sections]);

  useEffect(() => {
    const step = (dir) => {
      lockRef.current = true;
      setTimeout(() => {
        lockRef.current = false;
      }, COOLDOWN);
      setCurrentSectionIndex((prev) => {
        const next = prev + dir;
        return next < 0 || next > sections.length - 1 ? prev : next;
      });
    };

    const handleWheel = (e) => {
      // Sideways intent belongs to the work carousel, not to section paging.
      // A horizontal trackpad swipe reports deltaY: 0, which would otherwise
      // sample as zero momentum and step a section backwards on every event.
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;

      const now = Date.now();
      const abs = Math.abs(e.deltaY);
      const dir = e.deltaY > 0 ? 1 : -1;

      // A real pause, or a change of direction, begins a new gesture — forget
      // the previous swipe's samples so its momentum can't taint this one.
      if (now - prevTimeRef.current > GESTURE_GAP || dir !== prevDirRef.current) {
        samplesRef.current = [];
      }
      prevTimeRef.current = now;
      prevDirRef.current = dir;

      samplesRef.current.push(abs);
      if (samplesRef.current.length > 70) samplesRef.current.shift();

      if (lockRef.current) return;

      // Act only while the swipe is still gaining (or holding) speed. Inertial
      // momentum always decays, so its tail is ignored — but a fresh flick
      // re-accelerates and fires immediately, even mid-momentum.
      const recent = average(samplesRef.current, 10);
      const broad = average(samplesRef.current, 70);
      if (recent < broad) return;

      step(dir);
    };

    let startTouchX = null;
    let startTouchY = null;

    const handleTouchStart = (e) => {
      startTouchX = e.touches[0].clientX;
      startTouchY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (startTouchY === null) return;
      const deltaX = startTouchX - e.changedTouches[0].clientX;
      const deltaY = startTouchY - e.changedTouches[0].clientY;
      startTouchX = null;
      startTouchY = null;
      if (lockRef.current || Math.abs(deltaY) < 50) return;
      if (Math.abs(deltaX) >= Math.abs(deltaY)) return; // the carousel's gesture
      step(deltaY > 0 ? 1 : -1); // swipe up -> next, swipe down -> previous
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [sections]);

  return {
    currentSectionIndex,
    scrollToSection,
  };
};

export default useScrollNavigation;
