import PropTypes from "prop-types";

const Chip = ({ icon, text, bgColor, invertIcon }) => {
  return (
    <div
      className={`flex items-center space-x-1 text-darkMedium rounded-full px-3 py-1 shadow-sm bg-${bgColor}`}
    >
      {/* Avatar */}
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className={`w-4 h-4 rounded-full object-cover ${
            invertIcon ? "darkTheme:invert" : ""
          }`}
        />
      )}

      {/* Text */}
      {text && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
};

Chip.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  bgColor: PropTypes.string,
  invertIcon: PropTypes.bool,
};

export default Chip;
