import { useState } from "react";
import { useExerciseData } from "../Contexts/ExerciseContext";
import ExerciseExplain from "../components/ExerciseExplain/ExerciseExplain";

function NewExerciseFlow() {
  const [stage, setStage] = useState(0);
  const { currentQuestion, isLoading } = useExerciseData();

  if (isLoading) return null;

  return (
    <div>
      <ExerciseExplain setStage={setStage} />
    </div>
  );
}

export default NewExerciseFlow;
