import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import i18n from "../lib/i18n";

const Resume = ({ isCurrentSection, isDarkMode }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const openResume = () => {
    window.open(
      `files/Manuel Ruiz Tercedor CV - ${
        currentLanguage === "en" ? "Eng" : "Esp"
      } 25.pdf`,
      "_blank"
    );
  };

  return (
    <div className="h-screen w-screen bg-light text-dark flex flex-col items-center justify-center">
      <img
        onClick={openResume}
        src={`/portfolio/img/Cv 2025 ${
          currentLanguage === "en" ? "Eng" : "Esp"
        }-p${isDarkMode ? "-dark" : ""}.svg`}
        alt="resume"
        className={`absolute sm:h-2/3 sm:w-auto h-auto w-2/3 drop-shadow transition-all duration-500 hover:drop-shadow-primary hover:scale-[1.2] ${
          isDarkMode ? "border border-1px" : ""
        } transition-all duration-700 ease-in-out hover:rotate-0 ${
          isCurrentSection
            ? "-rotate-3"
            : "-translate-x-[1000px] rotate-180 opacity-0"
        }`}
      />
    </div>
  );
};

Resume.propTypes = {
  isCurrentSection: PropTypes.bool,
  isDarkMode: PropTypes.bool,
};

export default Resume;
