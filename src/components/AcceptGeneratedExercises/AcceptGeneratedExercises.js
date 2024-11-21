import { useNavigate } from "react-router-dom";
import SpokenText from "../SpokenText/SpokenText";

function AcceptGeneratedExercises({ onAccept, onChatbot }) {
  const navigate = useNavigate();

  return (
    <div className=" w-full min-h-40 py-4 flex flex-col gap-3 items-center justify-center">
      <SpokenText
        containerClass={"items-center text-lg"}
        text={"Would you like to keep practicing"}
      />
      <div className="flex gap-3 w-full max-w-96 items-center justify-center flex-1 font-semibold">
        <button
          onClick={() => navigate("/")}
          className=" flex-grow border-1 border-hightlight text-hightlight rounded-md py-2"
        >
          No
        </button>
        <button
          onClick={onChatbot}
          className=" flex-grow border-1 border-hightlight text-hightlight rounded-md py-2"
        >
          Ask question
        </button>
        <button
          onClick={onAccept}
          className="flex-grow bg-hightlight text-white rounded-md  py-2"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default AcceptGeneratedExercises;
