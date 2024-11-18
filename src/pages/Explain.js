import { useNavigate } from "react-router-dom";
import { useExerciseData } from "../Contexts/ExerciseContext";
import SpokenText from "../components/SpokenText/SpokenText";
import NextButtonRight from "../components/NextButtonRight/NextButtonRight";

function Explain() {
  const { exercise, currentQuestion } = useExerciseData();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`../steps/${currentQuestion.question_id}`);
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#8CB036" }}>
      {exercise?.description?.map((d, i) => {
        return (
          <SpokenText
            className={`font-black mb-5 p-3 text-lg flex-col rounded-lg ${
              i === 1 && "bg-white"
            }`}
            key={i}
            text={d}
          />
        );
      })}
      <NextButtonRight
        correct={true}
        className={`mt-5`}
        onClick={handleClick}
      />
    </div>
  );
}

export default Explain;
