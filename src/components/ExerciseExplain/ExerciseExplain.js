import { useExerciseData } from "../../Contexts/ExerciseContext";
import SpokenText from "../SpokenText/SpokenText";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import { useEffect, useState } from "react";
import useTextToSpeech from "../../hooks/useTextToSpeech";

function ExerciseExplain({ setStage }) {
  const { exercise } = useExerciseData();
  const { speak } = useTextToSpeech();
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleClick = () => {
    setStage((s) => s + 1);
    setButtonVisible(false);
  };

  useEffect(function () {
    speak(exercise.description.join(" "));
  }, []);

  return (
    <div className="p-4" style={{ backgroundColor: "#8CB036" }}>
      {exercise?.description?.map((d, i) => {
        return (
          <SpokenText
            containerClass={"items-start"}
            className={`font-black mb-5 p-3 text-lg flex-col rounded-lg ${
              i === 1 && "bg-white"
            }`}
            key={i}
            text={d}
            displayText={d}
          />
        );
      })}
      {buttonVisible && (
        <NextButtonRight
          correct={true}
          className={`mt-5`}
          onClick={handleClick}
        />
      )}
    </div>
  );
}

export default ExerciseExplain;
