import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import Chip from "./Chip";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const CardSlideshow = ({ isCurrentSection, isDarkMode }) => {
  const { t } = useTranslation();
  const data = [
    {
      title: t("project_1_t"),
      imgUrl: "/portfolio/img/cv-editor-1.png",
      chips: (
        <>
          <Chip
            icon="/portfolio/icons/javascript-original.svg"
            text="JavaScript"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/react-original.svg"
            text="React"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/vitejs-plain.svg"
            text="Vite"
            bgColor="light"
            invertIcon={true}
          />
        </>
      ),
      description: t("project_1_d"),
      liveUrl: "https://ruizterce-cv-editor.netlify.app/",
      repoUrl: "https://github.com/ruizterce/cv-editor",
    },
    {
      title: t("project_2_t"),
      imgUrl: `/portfolio/img/linkeem-2-${isDarkMode ? "d" : "l"}.png`,
      chips: (
        <>
          <Chip
            icon="/portfolio/icons/typescript-original.svg"
            text="TypeScript"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/react-original.svg"
            text="React"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/express-original.svg"
            text="Express"
            bgColor="light"
            invertIcon={true}
          />
          <Chip
            icon="/portfolio/icons/ionic-original.svg"
            text="Ionic"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/postgresql-plain.svg"
            text="PostgreSQL"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/prisma-original.svg"
            text="Prisma"
            bgColor="light"
            invertIcon={true}
          />
        </>
      ),
      description: t("project_2_d"),
      liveUrl: "https://linkeem.mooo.com",
      repoUrl: "https://github.com/ruizterce/linkeem",
    },
    {
      title: t("project_3_t"),
      imgUrl: "/portfolio/img/sn8krs-1.png",
      chips: (
        <>
          <Chip
            icon="/portfolio/icons/typescript-original.svg"
            text="TypeScript"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/nextjs-original.svg"
            text="Next.js"
            bgColor="light"
            invertIcon={true}
          />
          <Chip
            icon="/portfolio/icons/redux-original.svg"
            text="Redux"
            bgColor="light"
            invertIcon={true}
          />
          <Chip
            icon="/portfolio/icons/amazonwebservices-original-wordmark.svg"
            text="AWS"
            bgColor="light"
            invertIcon={true}
          />
          <Chip
            icon="/portfolio/icons/dynamodb-original.svg"
            text="DynamoDB"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/stripe.png"
            text="Stripe"
            bgColor="light"
          />
        </>
      ),
      description: t("project_3_d"),
      liveUrl: "https://eiozliays3.execute-api.eu-west-1.amazonaws.com/",
      repoUrl: "https://github.com/ruizterce/sn8krs",
    },
    {
      title: t("project_4_t"),
      chips: (
        <>
          {" "}
          <Chip
            icon="/portfolio/icons/typescript-original.svg"
            text="TypeScript"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/react-original.svg"
            text="React"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/vitejs-plain.svg"
            text="Vite"
            bgColor="light"
            invertIcon={true}
          />
          <Chip
            icon="/portfolio/icons/tailwindcss-original.svg"
            text="TailwindCSS"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/tonejs.png"
            text="Tone.js"
            bgColor="light"
          />
        </>
      ),
      imgUrl: "/portfolio/img/jsWave-4.png",
      description: t("project_4_d"),
      liveUrl: "https://ruizterce.github.io/jsWave/",
      repoUrl: "https://github.com/ruizterce/jsWave",
    },
    {
      title: t("project_5_t"),
      chips: (
        <>
          <Chip
            icon="/portfolio/icons/javascript-original.svg"
            text="JavaScript"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/react-original.svg"
            text="React"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/express-original.svg"
            text="Express"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/materialui-plain.svg"
            text="MUI"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/postgresql-plain.svg"
            text="PostgreSQL"
            bgColor="light"
          />
          <Chip
            icon="/portfolio/icons/prisma-original.svg"
            text="Prisma"
            bgColor="light"
            invertIcon={true}
          />
        </>
      ),
      imgUrl: "/portfolio/img/blog-authors-1.png",
      description: t("project_5_d"),
      liveUrl: "",
      repoUrl: "https://github.com/ruizterce/blog-api",
    },
  ];

  return (
    <div className="h-screen w-screen bg-light text-dark flex flex-col items-center justify-center">
      <h1
        className={`absolute text-3xl font-nunito font-black text-secondary translate-y-[-260px] sm:translate-y-[-310px] transition-all duration-700 ease-in-out ${
          isCurrentSection ? "" : "-translate-x-[1000px] opacity-0"
        }`}
      >
        {t("navBar_2")}
      </h1>
      <div
        className={`w-full translate-y-10 transition-all duration-700 ease-in-out ${
          isCurrentSection ? "" : "translate-x-[1000px] opacity-0"
        }`}
      >
        <Swiper
          effect={"coverflow"}
          modules={[EffectCoverflow, Pagination]}
          slidesPerView={"auto"}
          centeredSlides={true}
          initialSlide={2}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 200,
            scale: 0.9,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {data.map((project) => {
            return (
              <SwiperSlide
                key={project.title}
                className="max-w-xs sm:max-w-sm max-h-full"
              >
                <div className="swiper-slide-transform rounded-3xl bg-lightMild flex flex-col justify-center items-center ">
                  <img
                    src={project.imgUrl}
                    className="object-cover object-top w-full h-[300px] sm:h-[420px] rounded-t-3xl"
                  ></img>

                  <div className="flex flex-wrap justify-center gap-2 mx-2 mt-2 sm:mx-4 sm:mt-4">
                    {project.chips}
                  </div>
                  <div className="w-full flex flex-col items-center p-2">
                    <a
                      href={project.liveUrl ? project.liveUrl : null}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-1 px-4 font-nunito   ${
                        project.liveUrl
                          ? "bg-primary drop-shadow hover:scale-[1.05] hover:drop-shadow-primary active:shadow-none active:bg-medium active:scale-[0.9] font-black rounded-full transition-all duration-200"
                          : ""
                      }`}
                    >
                      <h1
                        className={`text-3xl font-nunito font-extrabold px-3 ${
                          project.liveUrl
                            ? "text-lightMild text-shadow-sm shadow-gray-500 active:shadow-primary "
                            : "text-primary"
                        }`}
                      >
                        {project.title}
                      </h1>
                    </a>

                    <h1 className="mb-2 font-light">{project.description}</h1>
                    <div className="box-border flex w-5/6 mb-2 justify-around ">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1 px-4 font-nunito bg-primary drop-shadow hover:scale-[1.05] hover:drop-shadow-primary active:shadow-none active:bg-medium active:scale-[0.9] font-black rounded-full transition-all duration-200"
                        >
                          <span className="text-lightMild text-shadow-sm shadow-gray-500 active:shadow-primary">
                            {t("live_site")}
                          </span>
                        </a>
                      ) : (
                        <></>
                      )}
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1 px-4 font-nunito bg-primary drop-shadow hover:scale-[1.05] hover:drop-shadow-primary active:shadow-none active:bg-medium active:scale-[0.9] font-black rounded-full transition-all duration-200"
                        >
                          <span className="text-lightMild text-shadow-sm shadow-gray-500 active:shadow-primary">
                            GITHUB
                          </span>
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
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
};

export default CardSlideshow;
