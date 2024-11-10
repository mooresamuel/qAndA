import { Link } from "react-router-dom";
import SpokenText from "../SpokenText/SpokenText";

function ExerciseBlock({ exercise }) {
  return (
    <Link
      to={`/exercise/${exercise.exercise_number}/select-with-coach-or-not`}
      style={{
        backgroundImage:
          'url("https://turningpages.co.uk/static/media/ExerciseCompletedBackground.6746fe45e2ec19006a22.png")',
      }}
      className=" block py-4 px-3 border-2 border-slate-2 max-w-[300px] rounded-lg shadow-md cursor-pointer no-underline"
    >
      <SpokenText
        text={exercise.exercise_name}
        className={"font-bold text-lg"}
      />
    </Link>
  );
}

export default ExerciseBlock;
