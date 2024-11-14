function NextButton({ onClick, disabled, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-hightlight text-white w-full font-semibold text-center py-2 rounded-md"
    >
      Next
    </button>
  );
}

export default NextButton;
