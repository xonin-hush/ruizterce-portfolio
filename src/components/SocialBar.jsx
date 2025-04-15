import PropTypes from "prop-types";

const SocialBar = ({ currentSectionIndex, isDarkMode }) => {
  const contactIcons = [
    {
      icon: "/portfolio/icons/github-original.svg",
      onClick: () => window.open("https://github.com/ruizterce/"),
    },
    {
      icon: "/portfolio/icons/mail.svg",
      onClick: () => window.open("mailto:ruiz.terce@gmail.com"),
    },
    {
      icon: "/portfolio/icons/linkedin-plain.svg",
      onClick: () =>
        window.open("https://www.linkedin.com/in/manuel-ruiz-tercedor/"),
    },
    {
      icon: "/portfolio/icons/discord-mark-black.svg",
      onClick: () => window.open("https://discord.com/users/ruizterce"),
    },
  ];

  const isCol = currentSectionIndex === 0 || currentSectionIndex === 3; // Transform into column
  const isContactSection = currentSectionIndex === 2; // Transform into contact section

  // Function to get transform class for each button
  const getTransformClass = (index) => {
    if (isContactSection) {
      switch (index) {
        case 0:
          return "translate-x-16 sm:translate-x-20 -translate-y-20 scale-[3] hover:scale-[4] active:scale-[2.5] drop-shadow-lg";
        case 1:
          return "-translate-x-16 sm:-translate-x-20 -translate-y-20 scale-[3] hover:scale-[4] active:scale-[2.5] drop-shadow-lg";
        case 2:
          return "translate-x-16 sm:translate-x-20 translate-y-20 scale-[3] hover:scale-[4] active:scale-[2.5] drop-shadow-lg";
        case 3:
          return "-translate-x-16 sm:-translate-x-20 translate-y-20 scale-[3] hover:scale-[4] active:scale-[2.5] drop-shadow-lg";
        default:
          return "";
      }
    } else if (isCol) {
      switch (index) {
        case 1:
          return "translate-y-10 translate-x-10 sm:translate-y-12 sm:translate-x-12";
        case 2:
          return "translate-y-10 sm:translate-y-12";
        case 3:
          return "translate-y-20 translate-x-10 sm:translate-y-24 sm:translate-x-12";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div
      className={`fixed  top-0 left-0 h-screen w-screen flex flex-col justify-start items-end select-none transition-transform duration-500 origin-center ${
        isContactSection ? "translate-y-1/2 -translate-x-1/2" : ""
      }`}
    >
      <nav
        className={`flex flex-wrap flex-row-reverse w-[72px] sm:w-[88px] gap-2 transition-transform duration-1000 origin-center relative left-[36px] sm:left-[44px] ${
          isContactSection
            ? ""
            : "translate-y-4 -translate-x-14 sm:-translate-x-20"
        }`}
      >
        {contactIcons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`h-8 w-8 sm:h-10 sm:w-10 transition-all duration-500 origin-center hover:drop-shadow-primary ${getTransformClass(
              index
            )}`}
          >
            <img
              src={button.icon}
              className={`transition-all duration-700  ${
                isDarkMode ? "invert" : ""
              }`}
              alt={`icon-${index}`}
              style={{
                filter:
                  "invert(48%) sepia(10%) saturate(279%) hue-rotate(342deg) brightness(89%) contrast(88%)",
              }}
            ></img>
          </button>
        ))}
      </nav>
    </div>
  );
};

SocialBar.propTypes = {
  currentSectionIndex: PropTypes.number,
  isDarkMode: PropTypes.bool,
};

export default SocialBar;
