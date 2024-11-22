import SpokenText from "../components/SpokenText/SpokenText";
import PersonSVG from "../components/PersonSVG/PersonSVG";
import { useExerciseData } from "../Contexts/ExerciseContext";
import { useNavigate } from "react-router-dom";

function SelectCoachOrNot() {
  const navigate = useNavigate();
  const { setWithCoach } = useExerciseData();

  function handleClick(bool) {
    setWithCoach(bool);
    navigate("../explain");
  }
  return (
    <div className="space-y-3 py-4 mx-4">
      <SpokenText
        className={"text-lg font-semibold"}
        text="Are you learning alone or with your coach?"
      />
      <SpokenText 
        text="click the option below to tell us if you are learning on your own today or with your coach"
      />
      <div
        onClick={() => handleClick(false)}
        className="w-full flex flex-col gap-3 justify-center items-center text-hightlight rounded-lg py-4 shadow-md"
      >
        <PersonSVG />
        <p className="m-0 font-semibold">By yourself</p>
      </div>
      <div
        onClick={() => handleClick(true)}
        className="w-full flex gap-3 flex-col justify-center items-center shadow-md text-white bg-hightlight rounded-lg py-4"
      >
        <div className="flex">
          <PersonSVG />
          <PersonSVG />
        </div>
        <p className="m-0 font-semibold">With a coach</p>
      </div>
    </div>
  );
}

export default SelectCoachOrNot;
