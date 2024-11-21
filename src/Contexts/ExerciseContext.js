import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getExercise } from "../services/getQuestionsAPI";

const ExerciseContext = createContext();

function ExerciseProvider({ children }) {
  const [withCoach, setWithCoach] = useState(false);
  const [exercise, setExercise] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const navigate = useNavigate();
  const { exercise_id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState({});

  // const currentQuestion = exercise?.questions?.at(questionIndex);
  const numQuestions = exercise?.questions?.length;

  useEffect(
    function () {
      async function fetch() {
        try {
          setIsLoading(true);
          const data = await getExercise(exercise_id);
          setExercise(data);
          setCurrentQuestion(data?.questions?.at(0));
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
      const newIndex = questionIndex + 1;
      navigate(
        `/exercise/${exercise_id}/steps/${
          exercise?.questions?.at(newIndex).question_id
        }`
      );
      setQuestionIndex(newIndex);
      setCurrentQuestion(exercise?.questions?.at(newIndex));
    }
    if (questionIndex === numQuestions - 1) {
      setTimeout(() => {
        setCurrentLevel(0);
        navigate(`/exercise/${exercise_id}/complete`);
      }, 330);
    }
  };

  const handleAddMistake = ({ question_id, mistake }) => {
    const newMistakesArray = {
      ...exercise,
      questions: exercise.questions.map((question) => {
        if (question.question_id === question_id) {
          return { ...question, mistakes: [...question.mistakes, mistake] };
        } else {
          return { ...question };
        }
      }),
    };
    setMistakes(newMistakesArray);
  };

  console.log(mistakes);

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
        setCurrentLevel,
        mistakes,
        handleAddMistake,
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
