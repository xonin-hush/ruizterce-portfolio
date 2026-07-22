import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Pagination, Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";
import Chip from "./Chip";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getCaseStudy } from "../content/caseStudies";

const CardSlideshow = ({ isCurrentSection, isDarkMode, category, headingKey }) => {
  const { t } = useTranslation();

  // How an image meets its fixed-height card box, in the same `fit` /
  // `objectPosition` vocabulary the case-study images already use — see the
  // photo()/shot() pair in src/content/caseStudies.js.

  // Diagrams are authored to a fixed 600x660 viewBox, so cropping one truncates
  // the architecture it exists to describe: object-cover was slicing the bottom
  // node off on mobile. They letterbox instead. Their canvas is transparent, so
  // the letterbox reads as card background rather than as bars.
  const diagram = (name) => ({
    imgUrl: `/img/diagram-${name}-${isDarkMode ? "d" : "l"}.svg`,
    fit: "contain",
  });

  // Photos fill the box and are cropped to do it. `objectPosition` is the focal
  // point that crop keeps — only worth setting when the subject would otherwise
  // fall outside the visible band, so most cards leave it at the default centre.
  const photo = (file, objectPosition) => ({
    imgUrl: `/img/${file}`,
    fit: "cover",
    objectPosition,
  });

  // Bespoke portrait cover art (Heritage Iraq, Discover Mosul), authored at the
  // card's own 2:3 ratio so it fills the frame edge-to-edge with no crop. The
  // `poster` flag swaps the shared landscape frame for a tall 2:3 one.
  const coverArt = (file) => ({
    imgUrl: `/img/${file}`,
    fit: "cover",
    poster: true,
  });

  // `slug` links each card to its case study in src/content/caseStudies.js,
  // which is also where each card's Work/Events category lives.
  const data = [
    {
      slug: "scanner-bridge",
      title: t("project_1_t"),
      ...diagram("scanner-bridge"),
      chips: (
        <>
          <Chip
            icon="/icons/python-original.svg"
            text="Python"
            bgColor="light"
          />
          <Chip
            icon="/icons/javascript-plain.svg"
            text="Vanilla JS"
            bgColor="light"
          />
          <Chip text="WebSockets" bgColor="light" />
          <Chip text="TWAIN / WIA" bgColor="light" />
        </>
      ),
      description: t("project_1_d"),
    },
    {
      slug: "heritage-iraq",
      title: t("project_7_t"),
      ...coverArt("heritage-iraq.webp"),
      chips: (
        <>
          <Chip
            icon="/icons/typescript-original.svg"
            text="TypeScript"
            bgColor="light"
          />
          <Chip text="Babylon.js" bgColor="light" />
          <Chip text="Colyseus" bgColor="light" />
        </>
      ),
      description: t("project_7_d"),
    },
    {
      slug: "discover-mosul",
      title: t("project_2_t"),
      ...coverArt("discover-mosul.webp"),
      chips: (
        <>
          <Chip
            icon="/icons/astro-original.svg"
            text="Astro"
            bgColor="light"
          />
          <Chip
            icon="/icons/laravel-original.svg"
            text="Filament"
            bgColor="light"
          />
          <Chip text="Role-based auth" bgColor="light" />
        </>
      ),
      description: t("project_2_d"),
    },
    {
      slug: "marshes-3d",
      title: t("project_3_t"),
      ...photo("marshes-boat.webp"),
      chips: (
        <>
          <Chip text="Photogrammetry" bgColor="light" />
          <Chip text="Insta360 X5" bgColor="light" />
          <Chip text="Interactive 3D" bgColor="light" />
        </>
      ),
      description: t("project_3_d"),
    },
    {
      slug: "brandenburg-scan",
      title: t("project_4_t"),
      // A 1600x2400 portrait: the subject stands low in the frame (rows
      // ~1570-2165), so a top-anchored crop drops him off the card entirely on
      // mobile. 85% keeps him and the 360 camera in frame at both breakpoints.
      ...photo("brandenburg-cloister.webp", "center 85%"),
      chips: (
        <>
          <Chip text="FARO Focus" bgColor="light" />
          <Chip text="Laser scanning" bgColor="light" />
          <Chip text="Point clouds" bgColor="light" />
        </>
      ),
      description: t("project_4_d"),
    },
    {
      slug: "vr-gallery-potsdam",
      title: t("project_5_t"),
      ...photo("vr-gallery.webp"),
      chips: (
        <>
          <Chip text="VR" bgColor="light" />
          <Chip text="AR" bgColor="light" />
          <Chip text="3D content" bgColor="light" />
        </>
      ),
      description: t("project_5_d"),
    },
    {
      slug: "qaf-testing",
      title: t("project_6_t"),
      ...diagram("qaf-testing"),
      chips: (
        <>
          <Chip text="Unit · Integration · E2E" bgColor="light" />
          <Chip text="CI/CD" bgColor="light" />
          <Chip text="Mocking" bgColor="light" />
        </>
      ),
      description: t("project_6_d"),
    },
  ];

  const cards = data.filter(
    (card) => getCaseStudy(card.slug)?.category === category
  );

  // Poster cards (2:3) stand taller than the landscape ones, so a carousel that
  // contains any needs its heading lifted clear of the tallest card's top edge.
  const hasPoster = cards.some((card) => card.poster);

  return (
    <div className="h-screen w-screen bg-light text-dark flex flex-col items-center justify-center">
      <h1
        className={`absolute text-3xl font-nunito font-black text-secondary transition-all duration-700 ease-in-out ${
          hasPoster
            ? "translate-y-[-330px] sm:translate-y-[-395px]"
            : "translate-y-[-260px] sm:translate-y-[-310px]"
        } ${isCurrentSection ? "" : "-translate-x-[1000px] opacity-0"}`}
      >
        {t(headingKey)}
      </h1>
      <div
        className={`w-full translate-y-10 transition-all duration-700 ease-in-out ${
          isCurrentSection ? "" : "translate-x-[1000px] opacity-0"
        }`}
      >
        <Swiper
          effect={"coverflow"}
          modules={[EffectCoverflow, Pagination, Mousewheel]}
          // Two-finger trackpad swipe left/right flips through the cards.
          // forceToAxis keeps it horizontal-only, so vertical scroll still
          // pages between sections (see useScrollNavigation, which likewise
          // yields horizontal intent to this carousel).
          mousewheel={{ forceToAxis: true }}
          slidesPerView={"auto"}
          centeredSlides={true}
          initialSlide={Math.floor(cards.length / 2)}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 200,
            scale: 0.9,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {cards.map((project) => {
            return (
              <SwiperSlide
                key={project.slug}
                className="max-w-xs sm:max-w-sm max-h-full"
              >
                {/* Swiper drives the coverflow `transform` on whichever element
                    carries `swiper-slide-transform`, and animates it with an
                    inline transition-duration. So this wrapper stays bare: any
                    `transition-*` utility here would pin transition-property to
                    something other than transform and the 3D tilt would snap
                    instead of easing. The card's own transitions live inside. */}
                <div className="swiper-slide-transform">
                  <Link
                    to={`/work/${project.slug}`}
                    className="group rounded-3xl bg-lightMild flex flex-col justify-center items-center transition-[filter] duration-300 hover:drop-shadow-primary"
                  >
                    <img
                      src={project.imgUrl}
                      alt={project.title}
                      style={{ objectPosition: project.objectPosition }}
                      className={`w-full rounded-t-3xl ${
                        project.poster ? "aspect-[2/3]" : "h-[300px] sm:h-[420px]"
                      } ${
                        project.fit === "contain"
                          ? "object-contain"
                          : "object-cover"
                      }`}
                    ></img>

                    <div className="flex flex-wrap justify-center gap-2 mx-2 mt-2 sm:mx-4 sm:mt-4">
                      {project.chips}
                    </div>
                    <div className="w-full flex flex-col items-center p-2">
                      <h1 className="text-3xl font-nunito font-extrabold px-3 text-center text-primary">
                        {project.title}
                      </h1>

                      <h1 className="mb-2 font-light text-center">
                        {project.description}
                      </h1>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

CardSlideshow.propTypes = {
  isCurrentSection: PropTypes.bool,
  isDarkMode: PropTypes.bool,
  category: PropTypes.oneOf(["work", "event"]).isRequired,
  headingKey: PropTypes.string.isRequired,
};

export default CardSlideshow;
