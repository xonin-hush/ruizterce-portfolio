import { useEffect, useState } from "react";
import Doom from "./Doom";

// ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

// Mounts the DOOM easter egg site-wide: a small, always-visible launcher chip
// plus the classic Konami code. Lives above the routes (not inside FullPage /
// WorkDetail) so it survives navigation and works on every page.
const DoomLauncher = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let progress = 0;
    const onKey = (e) => {
      const el = e.target;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      progress =
        key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play DOOM (1993)"
        title="DOOM (1993)"
        className="fixed bottom-4 right-4 z-[995] select-none rounded-md border border-white/20 bg-black/70 px-2 py-1 font-nunito text-[10px] font-black uppercase tracking-widest text-white/70 shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:text-primary active:scale-95"
      >
        DOOM
      </button>
      {open && <Doom onClose={() => setOpen(false)} />}
    </>
  );
};

export default DoomLauncher;
