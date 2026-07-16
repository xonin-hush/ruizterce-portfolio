import PropTypes from "prop-types";

const Resume = ({ isCurrentSection, isDarkMode }) => {
  return (
    <div className="h-screen w-screen bg-light text-dark flex flex-col items-center justify-center">
      <a
        href="/files/ahmed-sinan-hayder-cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute sm:h-2/3 sm:w-auto h-auto w-2/3 drop-shadow transition-all duration-700 ease-in-out hover:drop-shadow-primary hover:scale-[1.2] hover:rotate-0 ${
          isCurrentSection
            ? "-rotate-3"
            : "-translate-x-[1000px] rotate-180 opacity-0"
        }`}
      >
        <img
          src="/img/cv-preview.png"
          alt="Ahmed Sinan Hayder's resume (PDF)"
          className={`h-auto w-full sm:h-full sm:w-auto ${
            isDarkMode ? "invert-[.92] hue-rotate-180 border border-1px" : ""
          }`}
        />
      </a>
    </div>
  );
};

Resume.propTypes = {
  isCurrentSection: PropTypes.bool,
  isDarkMode: PropTypes.bool,
};

export default Resume;
