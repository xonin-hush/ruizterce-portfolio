import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// The original DOOM (1993) shareware — run in DOSBox, compiled to WASM by
// js-dos and served entirely from /public/doom (no third-party runtime). The
// ~6 MB engine + WAD is fetched lazily, only when the overlay mounts.
const BUNDLE_URL = "/doom/doom.jsdos";
const EMULATORS_PATH = "/doom/emulators/";

// Inject js-dos.js + js-dos.css from /public/doom exactly once, on demand.
let jsDosLoader = null;
function loadJsDos() {
  if (window.Dos) return Promise.resolve();
  if (jsDosLoader) return jsDosLoader;
  jsDosLoader = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/doom/js-dos.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "/doom/js-dos.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      jsDosLoader = null;
      reject(new Error("Failed to load js-dos"));
    };
    document.head.appendChild(script);
  });
  return jsDosLoader;
}

// A full-screen overlay (à la Lightbox) that boots DOOM. It sits above the
// custom cursor (z-[1200]) and restores a real cursor for aiming, and it
// swallows wheel/touch so the landing page's section paging stays put while
// you play.
const Doom = ({ onClose }) => {
  const mountRef = useRef(null);
  const ciRef = useRef(null);
  const overlayRef = useRef(null);
  const [status, setStatus] = useState("loading");

  // Boot the emulator once. The `cancelled` guard + stop() cover React 18
  // StrictMode's mount/unmount/mount so no orphan emulator is ever left running.
  useEffect(() => {
    let cancelled = false;
    loadJsDos()
      .then(() => {
        if (!mountRef.current || !window.Dos) return;
        const ci = window.Dos(mountRef.current, {
          url: BUNDLE_URL,
          pathPrefix: EMULATORS_PATH,
          backend: "dosbox",
          autoStart: true,
          kiosk: true,
          theme: "dark",
          noCloud: true,
        });
        if (cancelled) {
          ci.stop().catch(() => {});
          return;
        }
        ciRef.current = ci;
        setStatus("running");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
      const ci = ciRef.current;
      ciRef.current = null;
      if (ci) ci.stop().catch(() => {});
    };
  }, []);

  // Focus the overlay so keys reach the game, and let Escape close it. The ✕
  // button is the reliable exit in case js-dos captures Escape for its own menu.
  useEffect(() => {
    overlayRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // The game gets these events first (its listeners live inside the overlay);
  // stopping propagation here keeps them from reaching useScrollNavigation's
  // window listeners, so the sections behind the overlay never page.
  const swallow = (e) => e.stopPropagation();

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="DOOM (1993), shareware"
      tabIndex={-1}
      onWheel={swallow}
      onTouchStart={swallow}
      onTouchMove={swallow}
      onTouchEnd={swallow}
      style={{ cursor: "auto" }}
      className="fixed inset-0 z-[1200] flex flex-col items-center justify-center gap-3 bg-black/95 p-4 outline-none sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close DOOM"
        style={{ cursor: "auto" }}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl font-nunito font-black text-white transition-all duration-200 hover:scale-110 hover:bg-white/20 active:scale-90"
      >
        ×
      </button>

      <div className="relative flex aspect-[4/3] w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl">
        <div ref={mountRef} className="absolute inset-0 h-full w-full" />
        {status !== "running" && (
          <p className="pointer-events-none font-nunito text-sm font-bold text-white/70">
            {status === "loading" ? "Loading DOOM…" : "Couldn't load DOOM."}
          </p>
        )}
      </div>

      <p className="font-nunito text-xs font-bold text-white/50">
        Arrows move · Ctrl fires · Space opens doors · Esc to exit
      </p>
    </div>
  );
};

Doom.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Doom;
