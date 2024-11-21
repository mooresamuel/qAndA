import SpokenText from "../SpokenText/SpokenText";

function AcceptGeneratedExercises() {
  return (
    <div className=" w-full min-h-40 py-4 flex flex-col gap-3 items-center justify-center">
      <SpokenText
        containerClass={"items-center text-lg"}
        text={"Would you like to keep practicing"}
      />
      <div className="flex gap-3 w-full max-w-96 items-center justify-center flex-1 font-semibold">
        <button className=" flex-grow border-1 border-hightlight text-hightlight rounded-md py-2">
          No
        </button>
        <button className="w- flex-grow bg-hightlight text-white rounded-md  py-2">
          Yes
        </button>
      </div>
    </div>
  );
}

export default AcceptGeneratedExercises;
