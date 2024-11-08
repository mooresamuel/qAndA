/* eslint-disable react/prop-types */

function SpeakerButton({ onClick, children, disabled }) {
  return (
    <button
      className="bg-white p-2 rounded-lg shadow-md"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default SpeakerButton;
