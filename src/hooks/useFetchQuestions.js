import { useState, useEffect, useCallback } from "react";
import { getQuestionsAPI } from "../services/getQuestionsAPI";

export default function useFetchQuestions(moduleId, exerciseId) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const maxLevel = questions?.length;

  const getQuestions = useCallback(
    async function (moduleId, exerciseId) {
      setIsLoading(true);
      const questionData = await getQuestionsAPI(moduleId, exerciseId);
      setQuestions(questionData);
      setIsLoading(false);
    }

  , [moduleId, exerciseId]);


  useEffect(() => {
    if (moduleId && exerciseId) {
      getQuestions(moduleId, exerciseId);
    }
  }, [moduleId, exerciseId]);

  return { isLoading, questions, maxLevel };
}
