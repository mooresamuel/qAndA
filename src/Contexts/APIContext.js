import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import useFetchQuestions from "../hooks/useFetchQuestions";

const APIContext = createContext();

function APIProvider({ children }) {

  const [moduleId, setModuleId] = useState(null);
  const [exerciseId, setExerciseId] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);

  const [prevModuleId, setPrevModuleId] = useState(null);
  const [prevExerciseId, setPrevExerciseId] = useState(null);

  const initialiseQuestions = useRef(false);

  const { isLoading, questions, getQuestions, maxLevel } = useFetchQuestions(moduleId, exerciseId);

  const updateModuleId = (newModuleId) => setModuleId(newModuleId);
  const updateExerciseId = (newExerciseId) => setExerciseId(newExerciseId);
  const updateCurrentLevel = (newCurrentLevel) => setCurrentLevel(newCurrentLevel);

  useEffect(() => {

    if (moduleId && exerciseId) {
      if (initialiseQuestions.current) {
        if (moduleId !== prevModuleId || exerciseId !== prevExerciseId) {
          setPrevExerciseId(exerciseId);
          setPrevModuleId(moduleId);
          getQuestions(moduleId, exerciseId);
        }
      } else {
        getQuestions(moduleId, exerciseId);
        initialiseQuestions.current = true;
      }
      setPrevModuleId(moduleId);
      setPrevExerciseId(exerciseId);
    }
  }, [moduleId, exerciseId, getQuestions]);

  return (
    <APIContext.Provider value={{ isLoading, questions, currentLevel, maxLevel, updateModuleId, updateExerciseId, updateCurrentLevel }}>
      {children}
      <Outlet /> 
    </APIContext.Provider>
  );
}

export default APIProvider;

export const useAPIData = () => {
  const data = useContext(APIContext);
  if (!data)
    throw new Error("useAPIData used outside of APIContext Provider");
  return data;
};
