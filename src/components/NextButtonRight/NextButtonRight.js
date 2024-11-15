import RightArrowSVG from "../RightArrowSVG/RightArrowSVG";

function NextButtonRight({
  correct = true,
  onClick,
  className = "",
  strokeWidth = 4,
  arrowColor = "#fff",
  arrowSize = "w-5 h-5 mr-2"
}) {
  return (
    <button
    type="button"
    disabled={correct === false ? true : false}
    style={{
      cursor: correct === false ? "not-allowed" : "pointer",
      opacity: correct ? 1 : 0.5,
    }}
    className={`font-black text-lg flex items-center justify-center w-full py-3 bg-hightlight text-white rounded ${className}`}
    onClick={onClick}
  >
    <RightArrowSVG
      strokeWidth={strokeWidth}
      color={arrowColor}
      className={arrowSize}
    />
    Next
    </button>
  )
}

export default NextButtonRight;