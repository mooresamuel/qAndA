import RightArrowSVG from "../RightArrowSVG/RightArrowSVG";

function NextButtonRight({
  label = "Next",
  removeArrow = false,
  isEnabled = true,
  onClick,
  className = "",
  strokeWidth = 4,
  arrowColor = "#fff",
  arrowSize = "w-5 h-5 mr-2",
}) {
  return (
    <button
      type="button"
      disabled={isEnabled === false ? true : false}
      style={{
        cursor: isEnabled === false ? "not-allowed" : "pointer",
        opacity: isEnabled ? 1 : 0.5,
      }}
      className={`font-black text-lg flex items-center justify-center w-full py-3 bg-hightlight text-white rounded ${className}`}
      onClick={onClick}
    >
      {
        removeArrow ? null :
          <RightArrowSVG
            strokeWidth={strokeWidth}
            color={arrowColor}
            className={arrowSize}
          />
      }
      {label}
    </button>
  );
}

export default NextButtonRight;
