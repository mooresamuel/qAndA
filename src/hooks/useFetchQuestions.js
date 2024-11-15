import { useState, useEffect } from "react";
import { getQuestionsAPI } from "../services/getQuestionsAPI";

export default function useFetchQuestions(moduleId, exerciseId) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [maxLevel, setMaxLevel] = useState(null);

  async function getQuestions(moduleId, exerciseId) {
    setIsLoading(true);
    const questionData = await getQuestionsAPI(moduleId, exerciseId);
    setQuestions(questionData);
    setMaxLevel(questionData.length);
    setIsLoading(false);
  }

  useEffect(() => {
    if (moduleId && exerciseId) {
      getQuestions(moduleId, exerciseId);
    }
  }, [moduleId, exerciseId]);

  return { isLoading, getQuestions, questions, maxLevel };
}
