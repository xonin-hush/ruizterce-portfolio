import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  bodySections,
  getCaseStudy,
  sectionForCategory,
  studiesByCategory,
} from "../content/caseStudies";
import Chip from "./Chip";
import CustomCursor from "./CustomCursor";
import Lightbox from "./Lightbox";
import Topbar from "./TopBar";
import useDarkMode from "../hooks/useDarkMode";

const WorkDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const study = getCaseStudy(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // `body` is overflow:hidden globally so FullPage can own the wheel; this page
  // is long-form, so it opts back into normal scrolling — except while the
  // lightbox is open, when the page behind it should stay put.
  useEffect(() => {
    document.body.classList.toggle("page-scroll", lightboxIndex === null);
    return () => document.body.classList.remove("page-scroll");
  }, [lightboxIndex]);

  if (!study) return <Navigate to="/" replace />;

  // Prev/next wrap within the study's own tab, so a Work detail never links out
  // to an Events study and vice versa.
  const siblings = studiesByCategory(study.category);
  const index = siblings.findIndex((cs) => cs.slug === study.slug);
  const prev = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];

  // The hero photo leads the lightbox set; diagrams are illustrations, not photos,
  // so they stay out of it.
  const lightboxImages = study.hero ? [study.hero, ...study.gallery] : study.gallery;
  const galleryOffset = study.hero ? 1 : 0;

  const diagramSrc = `/img/diagram-${study.diagram}-${isDarkMode ? "d" : "l"}.svg`;

  const meta = [
    { label: t("work_role"), value: study.role },
    { label: t("work_org"), value: study.org },
    { label: t("work_timeframe"), value: study.timeframe },
  ];

  return (
    <div className={"nunitoSans min-h-screen bg-light" + (isDarkMode ? " dark-mode" : "")}>
      <CustomCursor />

      {/* Unlike the landing page, this one scrolls under the fixed controls —
          frost the strip behind them so both stay legible. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[980] h-[72px] bg-light/85 backdrop-blur-sm" />
      <Topbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Link
        to="/"
        state={{ section: sectionForCategory[study.category] }}
        className="fixed left-4 top-4 z-[990] flex items-center gap-2 rounded-full bg-lightMild/80 py-2 px-4 font-nunito font-black text-medium shadow-sm backdrop-blur transition-all duration-200 hover:scale-105 hover:text-primary active:scale-90 sm:left-6"
      >
        <span aria-hidden="true">←</span>
        <span className="text-sm">
          {study.category === "event" ? t("events_back") : t("work_back")}
        </span>
      </Link>

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-24 sm:px-8">
        <header className="mb-10">
          <h1 className="font-nunito text-3xl font-black text-secondary sm:text-4xl">
            {study.title}
          </h1>
          <p className="mt-3 text-lg font-light text-darkMedium">{study.tagline}</p>

          <dl className="mt-6 grid gap-4 border-y border-lightMild py-5 sm:grid-cols-3">
            {meta.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-nunito text-xs font-black uppercase tracking-wide text-lightMedium">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-dark">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {study.tech.map((item) => (
              <Chip key={item} text={item} bgColor="lightMild" />
            ))}
          </div>

          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lightMild py-2 px-4 font-nunito text-sm font-black text-medium transition-all duration-200 hover:scale-105 hover:text-primary active:scale-90"
            >
              <span>{t("work_live")}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </header>

        {study.hero ? (
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="group block w-full overflow-hidden rounded-3xl"
          >
            <img
              src={study.hero.src}
              alt={study.hero.alt}
              style={{ objectPosition: study.hero.objectPosition }}
              className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[420px]"
            />
          </button>
        ) : (
          <img
            src={diagramSrc}
            alt={`Architecture diagram — ${study.title}`}
            className="w-full rounded-3xl bg-lightMild object-contain"
          />
        )}

        {bodySections.map(({ key, labelKey }) => (
          <section key={key} className="mt-10">
            <h2 className="font-nunito text-xl font-black text-primary">{t(labelKey)}</h2>
            {study[key].map((paragraph) => (
              <p key={paragraph} className="mt-3 font-light leading-relaxed text-dark">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {study.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="font-nunito text-xl font-black text-primary">{t("work_gallery")}</h2>
            <p className="mt-1 text-sm font-light text-lightMedium">{t("work_gallery_hint")}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {study.gallery.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setLightboxIndex(i + galleryOffset)}
                  aria-label={image.alt}
                  className="group aspect-[4/3] overflow-hidden rounded-2xl bg-lightMild"
                >
                  {/* alt is empty because the button's aria-label already
                      carries this image's description. */}
                  <img
                    src={image.thumb}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-110 ${
                      image.fit === "contain" ? "object-contain" : "object-cover"
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        <nav className="mt-16 flex flex-col gap-3 border-t border-lightMild pt-6 sm:flex-row sm:justify-between">
          {[
            { study: prev, label: t("work_prev"), arrow: "←" },
            { study: next, label: t("work_next"), arrow: "→" },
          ].map(({ study: sibling, label, arrow }) => (
            <Link
              key={label}
              to={`/work/${sibling.slug}`}
              className="group flex-1 rounded-2xl bg-lightMild p-4 transition-all duration-200 hover:scale-[1.02] sm:max-w-[48%]"
            >
              <span className="font-nunito text-xs font-black uppercase tracking-wide text-lightMedium">
                {arrow} {label}
              </span>
              <span className="mt-1 block font-nunito text-lg font-extrabold text-primary">
                {t(sibling.titleKey)}
              </span>
            </Link>
          ))}
        </nav>
      </article>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default WorkDetail;
