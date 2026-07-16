import { Tilt } from "react-tilt";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Welcome = ({ isCurrentSection, isDarkMode }) => {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [showCard, setshowCard] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const [showScrollDownIcon, setShowScrollDownIcon] = useState(false);
  const timeoutId = useRef(null);
  const { t } = useTranslation();

  const hoverContent = {
    Ahmed: (
      <div className="max-w-[350px] flex flex-col items-center gap-4">
        <img
          src="/img/portrait.webp"
          alt="Ahmed Sinan Hayder at Informatik Festival 2025"
          className="h-auto rounded-xl"
        />
        <h1>{t("welcome_bio")}</h1>
      </div>
    ),
    "Software Engineer": (
      <div className="grid grid-cols-3 gap-4">
        <img
          src="/icons/javascript-plain.svg"
          alt="JavaScript"
          className="h-16 w-auto"
        />
        <img
          src="/icons/typescript-plain.svg"
          alt="TypeScript"
          className="h-16 w-auto"
        />
        <img
          src="/icons/python-original.svg"
          alt="Python"
          className="h-16 w-auto"
        />
        <img src="/icons/php-original.svg" alt="PHP" className="h-16 w-auto" />
        <img
          src="/icons/react-original-wordmark.svg"
          alt="React"
          className="h-16 w-auto"
        />
        <img
          src="/icons/vuejs-original.svg"
          alt="Vue.js"
          className="h-16 w-auto"
        />
        <img
          src="/icons/nextjs-original-wordmark.svg"
          alt="Next.js"
          className="h-16 w-auto darkTheme:invert"
        />
        <img
          src="/icons/astro-original.svg"
          alt="Astro"
          className="h-16 w-auto darkTheme:invert"
        />
        <img
          src="/icons/laravel-original.svg"
          alt="Laravel"
          className="h-16 w-auto"
        />
        <img
          src="/icons/materialui-plain.svg"
          alt="MUI"
          className="h-16 w-auto"
        />
        <img
          src="/icons/vitejs-plain.svg"
          alt="Vite"
          className="h-16 w-auto darkTheme:invert"
        />
        <img
          src="/icons/tailwindcss-plain-wordmark.svg"
          alt="TailwindCSS"
          className="h-16 w-auto darkTheme:invert"
        />
        <img
          src="/icons/docker-original.svg"
          alt="Docker"
          className="h-16 w-auto"
        />
        <img
          src="/icons/mysql-original.svg"
          alt="MySQL"
          className="h-16 w-auto darkTheme:invert"
        />
        <img
          src="/icons/postgresql-original-wordmark.svg"
          alt="PostgreSQL"
          className="h-16 w-auto darkTheme:invert"
        />
        <img
          src="/icons/git-plain-wordmark.svg"
          alt="Git"
          className="h-16 w-auto"
        />
        <img
          src="/icons/postman-plain-wordmark.svg"
          alt="Postman"
          className="h-16 w-auto"
        />
      </div>
    ),
    Mosul: (
      <div className="max-w-[350px] flex flex-col items-center gap-4">
        <img
          src={`${
            isDarkMode ? "/img/ziggurat-dusk.webp" : "/img/marsh-fieldwork.webp"
          }`}
          alt={
            isDarkMode
              ? "The Great Ziggurat of Ur at dusk"
              : "Fieldwork in the Iraqi Marshes"
          }
          className="h-auto w-full rounded-xl"
        />
        <h1>{t("welcome_mosul_caption")}</h1>
      </div>
    ),
  };

  // Hoverable words animation
  useEffect(() => {
    if (hoveredWord) return;
    const words = ["Ahmed", "Software Engineer", "Mosul"];
    let isMounted = true;

    const animateWords = () => {
      // Select and activate word
      const randomIndex = Math.floor(Math.random() * words.length);
      setActiveWord(words[randomIndex]);

      setTimeout(() => {
        if (isMounted) {
          setActiveWord(null); // Deactivate word

          // Wait before starting the next cycle
          setTimeout(() => {
            if (isMounted) {
              animateWords(); // Restart the cycle
            }
          }, 4000);
        }
      }, 450);
    };

    animateWords();

    return () => {
      isMounted = false;
    };
  }, [hoveredWord]);

  const handleMouseEnter = (word, event) => {
    clearTimeout(timeoutId.current); // Cancel any pending hide operation
    setHoveredWord(word);
    setActiveWord(null); // Stop cycling when hovered
    setCardPosition({ x: event.clientX, y: event.clientY });

    setTimeout(() => {
      setshowCard(true);
    }, 30); // Slight delay to trigger the animation
  };

  const handleMouseMove = (event) => {
    if (hoveredWord) {
      setCardPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setshowCard(false); // Trigger the disappearance animation

    // Remove the card after the animation completes
    timeoutId.current = setTimeout(() => {
      setHoveredWord(null);
    }, 500);
  };

  // Show scroll down icon animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowScrollDownIcon(true);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Hide scroll down icon animation
  useEffect(() => {
    if (isCurrentSection === false) {
      setShowScrollDownIcon(false);
    }
  }, [isCurrentSection]);

  const tiltOptions = {
    reverse: true,
    max: 20,
    perspective: 900,
    scale: 1,
    speed: 10000,
    transition: true,
    axis: null,
    reset: false,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <div
      className="h-screen w-screen bg-light text-dark flex flex-col items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <Tilt
        options={tiltOptions}
        className="relative h-full w-5/6 flex justify-center items-center"
      >
        <div className="text-center w-5/6 sm:w-2/3 text-xl flex flex-col items-center">
          <div className="leading-5">
            <h1 className="text-4xl font-nunito font-black text-secondary leading-[2em] transition-all duration-700 ease-in-out">
              {t("welcome_title")}
            </h1>
            <span className="text-2xl font-nunitoSans font-thin text-center tracking-[0.05em] leading-[0.3em]">
              {t("welcome_p_1")}{" "}
            </span>
            <span
              className={`text-4xl font-nunito font-black text-primary text-justify drop-shadow hover:drop-shadow-primary hover:scale-[1.05] inline-block transition-all duration-[600ms] ease-in-out tracking-[0.02em] leading-[0.3em] ${
                activeWord === "Ahmed" ? "drop-shadow-primary scale-[1.05]" : ""
              } ${isCurrentSection ? "" : "translate-x-[1000px]"}`}
              onMouseEnter={(e) => handleMouseEnter("Ahmed", e)}
              onMouseLeave={handleMouseLeave}
            >
              {t("welcome_name")}
            </span>
            <br />
            <span className="font-nunitoSans font-thin text-[1.4em] leading-[1.1em] tracking-[0.155em]">
              {t("welcome_p_2")}
            </span>
            <br />
            <p
              className={`w-max text-4xl font-nunito font-extrabold text-primary drop-shadow hover:drop-shadow-primary hover:scale-[1.05] block transition-all duration-700 ease-in-out tracking-[0.1em] leading-[1em] ${
                activeWord === "Software Engineer"
                  ? "drop-shadow-primary scale-[1.05]"
                  : ""
              } ${isCurrentSection ? "" : "-translate-x-[1000px]"}`}
              onMouseEnter={(e) => handleMouseEnter("Software Engineer", e)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="tracking-[0.1em]">{t("welcome_p_3")}</span>
              <br />
              <span className="tracking-[0.1em]">{t("welcome_p_4")}</span>
            </p>
            <span className="font-nunitoSans font-thin text-[1.4em] relative top-[1px] tracking-[0.096em] leading-[1em]">
              {t("welcome_p_5")}
            </span>
            <br />
            <span
              className={`text-4xl font-nunito font-black text-primary drop-shadow hover:drop-shadow-primary hover:scale-[1.05] block transition-all duration-[900ms] ease-in-out tracking-[0.11em] ${
                activeWord === "Mosul" ? "drop-shadow-primary scale-[1.05]" : ""
              } ${isCurrentSection ? "" : "translate-x-[1000px]"}`}
              onMouseEnter={(e) => handleMouseEnter("Mosul", e)}
              onMouseLeave={handleMouseLeave}
            >
              {t("welcome_city")}
            </span>
          </div>
        </div>
      </Tilt>

      {/* Scroll/Swipe icon hint */}
      <div
        className={`absolute bottom-20 text-center animate-custom-pulse transform-scale duration-[1500ms] ${
          showScrollDownIcon ? "scale-100" : "scale-0"
        }`}
      >
        <img
          src={`${
            window.innerWidth <= 768
              ? "/icons/swipe_vertical.svg"
              : "/icons/scroll-down.svg"
          }`}
          alt="Scroll down"
          className="w-16 md:w-10 h-auto"
        />
      </div>

      {/* Hover Card */}
      {hoveredWord && (
        <div
          className={`absolute z-[1000] max-w-[600px] sm:-translate-y-1/2 bg-light text-dark shadow-lg p-4 rounded-xl transition-all duration-500 ease-out text-justify darkTheme:border border-dark ${
            showCard ? "scale-100 opacity-1" : "scale-0 opacity-0"
          } ${window.innerWidth < 640 ? "fixed bottom-4 left-4 right-4" : ""}`}
          style={
            window.innerWidth >= 640
              ? {
                  [cardPosition.x > window.innerWidth / 2
                    ? "right"
                    : "left"]: `${
                    cardPosition.x > window.innerWidth / 2
                      ? Math.abs(cardPosition.x - window.innerWidth - 100)
                      : Math.abs(cardPosition.x + 100)
                  }px`,
                  top: `${cardPosition.y}px`,
                  transformOrigin:
                    cardPosition.x > window.innerWidth / 2 ? "right" : "left",
                }
              : {}
          }
        >
          <div>{hoverContent[hoveredWord]}</div>
        </div>
      )}
    </div>
  );
};

Welcome.propTypes = {
  isCurrentSection: PropTypes.bool,
  isDarkMode: PropTypes.bool,
};

export default Welcome;
