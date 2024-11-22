/* eslint-disable react/prop-types */

function SpeakerButton({ onClick, children, disabled, className = "" }) {
  return (
    <button
      className={`bg-white p-2 rounded-lg shadow-md ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default SpeakerButton;
