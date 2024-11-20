function QuestionMarkSVG({ handleClick }) {
  return (
    <svg
      onClick={handleClick}
      fill="#000000"
      viewBox="0 0 24 24"
      className="w-6 h-6 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g data-name="Layer 2">
          <g data-name="menu-arrow-circle">
            <rect
              width="24"
              height="24"
              transform="rotate(180 12 12)"
              opacity="0"
            ></rect>
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-5.16V14a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.5-1.5 1 1 0 0 1-2 0 3.5 3.5 0 1 1 4.5 3.34z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default QuestionMarkSVG;
