import { useExerciseData } from "../Contexts/ExerciseContext";

function Explain() {
  const { withCoach } = useExerciseData();
  return <div>explain Page</div>;
}

export default Explain;
