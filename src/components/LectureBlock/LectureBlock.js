import SpokenText from "../SpokenText/SpokenText";

function LectureBlock() {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://turningpages.co.uk/static/media/ExerciseCompletedBackground.6746fe45e2ec19006a22.png")',
      }}
      className="p-3 border-2 border-slate-2 max-w-56 rounded-lg shadow-md"
    >
      <SpokenText text={"testing"} className={"font-bold text-lg "} />
    </div>
  );
}

export default LectureBlock;
