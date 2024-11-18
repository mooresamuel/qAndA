import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getExercise } from "../services/getQuestionsAPI";

const ExerciseContext = createContext();

function ExerciseProvider({ children }) {
  const [withCoach, setWithCoach] = useState(false);
  const [exercise, setExercise] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { exercise_id } = useParams();

  const currentQuestion = exercise?.questions[questionIndex];
  const numQuestions = exercise?.questions?.length;

  useEffect(
    function () {
      async function fetch() {
        const data = await getExercise(exercise_id);
        setExercise(data);
      }

      fetch();
    },
    [exercise_id]
  );

  const handleNextQuestion = () => {
    if (questionIndex < numQuestions) {
      setQuestionIndex((i) => i + 1);
    }
  };

  return (
    <ExerciseContext.Provider
      value={{
        withCoach,
        setWithCoach,
        exercise,
        currentQuestion,
        numQuestions,
        handleNextQuestion,
      }}
    >
      {children}
      <Outlet />
    </ExerciseContext.Provider>
  );
}

export default ExerciseProvider;

export const useExerciseData = () => {
  const data = useContext(ExerciseContext);
  if (!data)
    throw new Error("useExerciseData used outside of ExerciseContext Provider");
  return data;
};
