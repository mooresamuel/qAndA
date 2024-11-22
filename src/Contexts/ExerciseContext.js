import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getExercise } from "../services/getQuestionsAPI";

const ExerciseContext = createContext();

function ExerciseProvider({ children }) {
  const navigate = useNavigate();
  const { exercise_id } = useParams();
  const [withCoach, setWithCoach] = useState(false);
  const [exercise, setExercise] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const usedAiInExercise = useRef(false);

  // const currentQuestion = exercise?.questions?.at(questionIndex);
  const numQuestions = exercise?.questions?.length;

  useEffect(
    function () {
      if (exercise) {
        setMistakes(exercise);
      }
    },
    [exercise]
  );

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
    // handleAddMistake({ question_id: currentQuestion.question_id });
    usedAiInExercise.current = false;
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

  const handleUseGeneratedQuestions = (generatedQuestions) => {
    setMistakes([]);
    setExercise((exercise) => {
      return { ...exercise, questions: [generatedQuestions] };
    });
    setQuestionIndex(0);
    setCurrentQuestion(generatedQuestions);
    navigate(`/exercise/${exercise_id}/steps/ai_generated`);
  };

  const handleAddMistake = ({ mistake }) => {
    const newMistakesArray = {
      ...mistakes,
      questions: mistakes.questions.map((question) => {
        if (mistake && currentQuestion.question_id === question.question_id) {
          const currentMistakes = question.mistakes
            ? [...question.mistakes]
            : [];

          return {
            ...question,
            mistakes: [...currentMistakes, mistake],
            used_Ai: usedAiInExercise.current,
          };
        } else {
          return { ...question, usedAi: usedAiInExercise.current };
        }
      }),
    };
    setMistakes(newMistakesArray);
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
        setCurrentLevel,
        mistakes,
        handleAddMistake,
        usedAiInExercise,
        handleUseGeneratedQuestions,
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
