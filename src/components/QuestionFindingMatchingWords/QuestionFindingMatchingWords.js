import { useState, useEffect } from "react";
import RightArrowSVG from "../RightArrowSVG/RightArrowSVG";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import Word from "../Word/Word";

const mockData = {
  question_type: "find-matching-words",
  sound: "er",
  data: [["fitter", "turn", "herb", "first"], ["fur", "better", "burst", "term"], ["bird", "Thursday", "shirt", "birthday"]],
};

// question should replace mockData the data and sound will be whatever key the data has

function QuestionFindingMatchingWords({ question, currentLevel=0, totalLevel=5 }) {
  const [picks, setPicks] = useState([]);
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [level, setLevel] = useState(currentLevel);

  const handleClick = (index, word) => {
    setPicks((prevPicks) => {
      if (prevPicks.includes(word)) {
        return prevPicks.filter((w) => w !== word);
      } else {
        return [...prevPicks, word];
      }
    });
    setClickedIndexes((prevIndex) => {
      if (prevIndex.includes(index)) {
        return prevIndex.filter((i) => i !== index);
      } else {
        return [...prevIndex, index];
      }
    });
  };

  const handleNext = () => {
    if (level < totalLevel) {
      setLevel((prevLevel) => prevLevel + 1);
    } else {
      console.log("Max level reached");
    }
  }

  useEffect(() => {
    if (answers.length === 0) {
      setData((Array.isArray(mockData.data[0]) ? mockData.data.flat() : mockData.data).filter(w => w));
      setAnswers((Array.isArray(mockData.data[0]) ? mockData.data.flat() : mockData.data).filter(word => word.includes(mockData.sound)));
    }
  }, []);

  useEffect(() => {
    if (picks.length > 0) {
      if (answers.every(word => picks.includes(word))) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
  }, [picks]);

  return (
    <div style={{ backgroundColor: "#8CB036" }} className="h-full p-5 flex flex-col gap-14 items-center">
      <div className="w-full grid grid-cols-[95%_5%] items-center gap-2 px-4">
        <ProgressBar currentStep={level} totalSteps={totalLevel} />
        <QuestionMarkSVG />
      </div>

      <h2 className="font-bold text-center">{mockData.sound}</h2>

      <div className="flex flex-col gap-3 p-4 w-full items-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {
            data.length > 0 && data.map((word, i) => (
              <Word 
                key={i + word} 
                word={word}
                sound={mockData.sound}
                clicked={clickedIndexes.includes(i)}
                onClick={() => handleClick(i, word)}
              />
            ))
          }
        </div>
        <button 
          type="button" 
          disabled={correct === false ? true : false} 
          style={{ cursor: correct === false ? "not-allowed" : "pointer", opacity: correct ? 1 : 0.5 }} 
          className={`mt-28 font-black text-lg flex items-center justify-center w-full py-3 bg-hightlight text-white rounded`}
          onClick={handleNext}>
            <RightArrowSVG strokeWidth={4} color="#fff" className="w-5 h-5 mr-2" />
            Next
        </button>
      </div>
    </div>
  );
}

export default QuestionFindingMatchingWords;
