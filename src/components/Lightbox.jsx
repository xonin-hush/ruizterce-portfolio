import { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// Overlay colours are literal rather than themed: the palette inverts in dark
// mode, and a lightbox should stay dark either way.
const Lightbox = ({ images, index, onClose, onNavigate }) => {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const image = images[index];

  const step = useCallback(
    (offset) => onNavigate((index + offset + images.length) % images.length),
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, step]);

  // Move focus into the overlay so the keyboard shortcuts have a home, then
  // hand it back to the thumbnail on close so Tab doesn't restart at the top.
  useEffect(() => {
    const opener = document.activeElement;
    dialogRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  const isSingle = images.length < 2;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-4 bg-black/90 p-4 outline-none backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t("lightbox_close")}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl font-nunito font-black text-white transition-all duration-200 hover:scale-110 hover:bg-white/20 active:scale-90"
      >
        ×
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full min-h-0 flex-col items-center gap-3"
      >
        <img
          src={image.src}
          alt={image.alt}
          className="min-h-0 max-w-full flex-1 rounded-2xl object-contain shadow-2xl"
        />
        <figcaption className="max-w-2xl shrink-0 text-center font-nunitoSans text-sm font-light text-white/70">
          {image.alt}
        </figcaption>
      </figure>

      {!isSingle && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex shrink-0 items-center gap-4"
        >
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={t("lightbox_prev")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-nunito text-xl font-black text-white transition-all duration-200 hover:scale-110 hover:bg-white/20 active:scale-90"
          >
            ‹
          </button>
          <span className="font-nunito text-sm font-bold tabular-nums text-white/60">
            {t("lightbox_counter", { current: index + 1, total: images.length })}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={t("lightbox_next")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-nunito text-xl font-black text-white transition-all duration-200 hover:scale-110 hover:bg-white/20 active:scale-90"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Lightbox;
