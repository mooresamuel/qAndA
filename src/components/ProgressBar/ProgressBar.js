import React from "react";
import { useExerciseData } from "../../Contexts/ExerciseContext";

const ProgressBar = () => {
  const { currentLevel, numQuestions } = useExerciseData();
  const progress = (currentLevel / numQuestions) * 100;
  return (
    <div
      style={{ backgroundColor: "#F0F1F5" }}
      className="w-full rounded-full h-5"
    >
      <div
        className="h-5 rounded-full transition-all duration-300"
        style={{ backgroundColor: "#050D30", width: `${progress === numQuestions - 1 ? progress + 1 : progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
