import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getMilestones } from "../services/milestonesAPI";
import useQuerySelector from "../hooks/useQuerySelector";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [milestones, setMilestones] = useState([]);
  const [selector, setSelector] = useState("body");
  const [disableText, setDisableText] = useState({});

  console.log("selector Global", selector);

  const { element, href } = useQuerySelector(selector);

  useEffect(function () {
    async function fetch() {
      const data = await getMilestones();
      setMilestones(data.sort((a, b) => a.module_number - b.module_number));
    }
    fetch();
  }, []);

  return (
    <GlobalContext.Provider value={{ milestones, setMilestones, element, href, setSelector, setDisableText, disableText }}>
      {children}
      <Outlet />
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

export const useGlobalContext = () => {
  const data = useContext(GlobalContext);
  if (!data)
    throw new Error("useGlobalContext used outside of GlobalContext Provider");
  return data;
};
