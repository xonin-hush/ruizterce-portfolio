import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Navbar = ({ sections, currentSectionIndex, scrollToSection }) => {
  const { t } = useTranslation();
  // The Work (1) and Events (2) carousels collapse the nav into a compact,
  // unlabeled dot cluster; content sections show the labeled vertical menu.
  const isCol = currentSectionIndex !== 1 && currentSectionIndex !== 2;
  return (
    <nav className="fixed top-4 left-6 flex flex-wrap flex-row w-[72px] sm:w-[88px] gap-2 transition-transform duration-1000  origin-center ">
      {sections.map((section, index) => {
        const getTransformClass = () => {
          if (!isCol) return "";

          // Define transformations for specific indexes
          switch (index) {
            case 1:
              return "-translate-x-10 translate-y-10  sm:translate-y-12";
            case 2:
              return "translate-y-10 sm:translate-y-12";
            case 3:
              return "-translate-x-10 translate-y-20 sm:translate-y-24";
            case 4:
              return "translate-y-20 sm:translate-y-24";
            default:
              return "";
          }
        };

        return (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={`bg-none border-none flex items-center gap-2 border select-none transition-all duration-500 ${getTransformClass()} `}
          >
            <span
              className={`h-8 w-8 sm:my-1 rounded-full transition-all duration-500 ${
                currentSectionIndex === index
                  ? "bg-primary border-4 border-medium"
                  : "border-2 border-lightMedium"
              }`}
            ></span>
            <span
              className={`hidden sm:block absolute left-10 font-nunito text-lg transition-all duration-500 ${
                isCol ? "opacity-1" : "opacity-0"
              } ${
                currentSectionIndex === index
                  ? "text-medium font-black scale-[1.2] translate-x-2"
                  : "text-lightMedium font-medium"
              }`}
            >
              {isCol ? t(`navBar_${index + 1}`) : ""}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

Navbar.propTypes = {
  sections: PropTypes.array.isRequired,
  currentSectionIndex: PropTypes.number.isRequired,
  scrollToSection: PropTypes.func.isRequired,
};

export default Navbar;
