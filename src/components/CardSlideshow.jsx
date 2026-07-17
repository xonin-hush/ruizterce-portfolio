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
  // `slug` links each card to its case study in src/content/caseStudies.js,
  // which is also where each card's Work/Events category lives.
  const data = [
    {
      slug: "scanner-bridge",
      title: t("project_1_t"),
      imgUrl: `/img/diagram-scanner-bridge-${isDarkMode ? "d" : "l"}.svg`,
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
      imgUrl: "/img/heritage-iraq-map.webp",
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
      imgUrl: `/img/diagram-discover-mosul-${isDarkMode ? "d" : "l"}.svg`,
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
      imgUrl: "/img/marshes-boat.webp",
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
      imgUrl: "/img/brandenburg-cloister.webp",
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
      imgUrl: "/img/vr-gallery.webp",
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
      imgUrl: `/img/diagram-qaf-testing-${isDarkMode ? "d" : "l"}.svg`,
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

  return (
    <div className="h-screen w-screen bg-light text-dark flex flex-col items-center justify-center">
      <h1
        className={`absolute text-3xl font-nunito font-black text-secondary translate-y-[-260px] sm:translate-y-[-310px] transition-all duration-700 ease-in-out ${
          isCurrentSection ? "" : "-translate-x-[1000px] opacity-0"
        }`}
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
                      className="object-cover object-top w-full h-[300px] sm:h-[420px] rounded-t-3xl"
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
