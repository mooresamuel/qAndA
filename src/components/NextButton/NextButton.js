function NextButton({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      className="bg-hightlight text-white w-full font-semibold text-center py-2 rounded-md"
    >
      Next
    </button>
  );
}

export default NextButton;
