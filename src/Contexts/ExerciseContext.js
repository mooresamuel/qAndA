import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getExercise } from "../services/getQuestionsAPI";

const ExerciseContext = createContext();

function ExerciseProvider({ children }) {
  const [withCoach, setWithCoach] = useState(false);
  const [exercise, setExercise] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const navigate = useNavigate();
  const { exercise_id } = useParams();

  const currentQuestion = exercise?.questions?.at(questionIndex);
  const numQuestions = exercise?.questions?.length;

  useEffect(
    function () {
      async function fetch() {
        try {
          setIsLoading(true);
          const data = await getExercise(exercise_id);
          setExercise(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetch();
    },
    [exercise_id]
  );

  const handleNextQuestion = () => {
    setCurrentLevel((level) => level + 1);
    if (questionIndex < numQuestions - 1) {
      navigate(
        `/exercise/${exercise_id}/steps/${
          exercise?.questions?.at(questionIndex + 1).question_id
        }`
      );
      setQuestionIndex((i) => i + 1);
    }
    if (questionIndex === numQuestions - 1) {
      setTimeout(() => {
        setCurrentLevel(0);
        navigate(`/exercise/${exercise_id}/complete`);
      }, 500);
    }
  };

  return (
    <ExerciseContext.Provider
      value={{
        withCoach,
        setWithCoach,
        exercise,
        isLoading,
        questionIndex,
        currentQuestion,
        numQuestions,
        handleNextQuestion,
        currentLevel,
        setCurrentLevel
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
