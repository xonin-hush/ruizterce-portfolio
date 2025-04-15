import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Topbar = ({ isDarkMode, setIsDarkMode }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const handleDarkToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed z-[990] left-1/2 top-5 -translate-x-1/2 flex gap-6 sm:gap-12">
      {/* Dark mode toggle */}
      <label className="inline-flex items-center opacity-25 hover:opacity-100 transition-all duration-500">
        <input
          type="checkbox"
          onChange={handleDarkToggle}
          checked={isDarkMode}
          className="sr-only peer"
        />
        <div
          className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-medium rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
            isDarkMode ? "bg-lightMedium" : "bg-gray-300"
          }`}
        >
          <span className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center -translate-x-[9px] gap-0">
              <img src="icons/dark_mode.svg" alt="" className="w-5" />
              <img src="icons/light_mode.svg" alt="" className="w-5" />
            </div>
          </span>
        </div>
      </label>

      {/* Language toggle */}
      <label className="inline-flex items-center opacity-25 hover:opacity-100 transition-all duration-500">
        <input
          type="checkbox"
          onChange={toggleLanguage}
          checked={currentLang === "es"}
          className="sr-only peer"
        />
        <div
          className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-medium rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
            isDarkMode ? "bg-lightMedium" : "bg-gray-300"
          }`}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
            <div className="flex items-center gap-1 text-sm font-bold text-medium">
              <span>es</span>
              <span>en</span>
            </div>
          </span>
        </div>
      </label>
    </div>
  );
};

Topbar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  setIsDarkMode: PropTypes.func.isRequired,
};

export default Topbar;
