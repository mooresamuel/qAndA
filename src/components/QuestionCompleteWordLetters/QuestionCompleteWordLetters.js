import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import AnimatedTag from "../AnimatedTag/AnimatedTag";
import ModalElement from "../ModalElement/ModalElement";

// const data = {
//   description: ['Remember that vowel sounds can be long or short. The long vowel sounds are ā, ē, ō, ĩ and ũ', 'the short ones are a, e, i, o, and u. In this acti…here. Read each word as it appears on the screen.'],
//   other_topics: ['level 8 other topics'],
//   phonics: ['level 8 phonics'],
//   questions: [{
//     question_type: "complete_spelling",
//     answers: ["tube"],
//     data: ["t", "u", "b", "e"],
//     prompts: ["t", "b"]
//   }],
//   sight_words: ['level 8 sight words']
// }

// const questions = [
//   {
//     answers: ["tube"],
//     data: ["t", "u", "b", "e"],
//     prompts: ["t", "b"]
//   }
// ];

function QuestionCompleteWordLetters(
  questions
) {
  console.log("COMPONENT HIT!")
  const navigate = useNavigate();
  const { handleNextQuestion } = useExerciseData();
  const { question } = questions;
  console.log("ALL Question", questions);

  const topLettersRefs = useRef([]);
  const bottomLettersRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [animatingLetter, setAnimatingLetter] = useState(null);
  const [spelling, setSpelling] = useState([]);

  const [letterSlots, setLetterSlots] = useState([]);

  const [findEmptyIndex, setFindEmptyIndex] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [restart, setRestart] = useState(false);
  const [enableNextStage, setEnableNextStage] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);

  const handleTopClick = (e, i, array) => {
    if (correct) {
      return;
    }

    const currentLetter = e.target.innerText;
    const bottomRefIndex = question.data.indexOf(currentLetter);

    if (array[i] === "") {
      if (bottomRefIndex !== -1) {
        const topRect = topLettersRefs.current[i]?.getBoundingClientRect();
        const bottomRect = bottomLettersRefs.current[bottomRefIndex]?.getBoundingClientRect();
        setAnimatingLetter({
          content: currentLetter,
          start: topRect,
          end: bottomRect,
        });
      }
      setActiveIndex(i);

      setSpelling((prev) => {
        const arr = [...prev]
        arr[i] = "";
        return arr;
      });
      setTimeout(() => {
        setAnimatingLetter(null);
      }, 400);

    } else {
      return "";
    }
  }

  const initalSetUp = () => {
    if (letterSlots.length === 0) {
      console.log("QUESTION DATA!", question.data);
      const createLetterSlots = question.data.map((char) => 
        question.prompts.includes(char) ? char : "");
      console.log("CreateLetterSlots", createLetterSlots);
      setLetterSlots(createLetterSlots);
      setSpelling(createLetterSlots);
      setActiveIndex(createLetterSlots.findIndex(char => char === ""));
    }
  }


  const handleLetterClick = (letter, index) => {

    const bottomRect = bottomLettersRefs.current[index]?.getBoundingClientRect();
    const topRect = topLettersRefs.current[activeIndex]?.getBoundingClientRect();

    if (!bottomRect || !topRect) return;

    setAnimatingLetter({
      content: letter,
      start: bottomRect,
      end: topRect,
    });

    setTimeout(() => {
      setSpelling((prev) => {
        const arr = [...prev];
        arr[activeIndex] = letter;
        return arr;
      });
      setFindEmptyIndex(true);
      setAnimatingLetter(null);
      
    }, 400);
  };

  // TODO: Handle Next Page Click event
  const handleNext = () => {
    if (spelling.join("") === question.answers[0]) {
      setCorrect(true);
      setTimeout(() => {
        handleNextQuestion();
      }, 10);
      setLetterSlots([]);
      setRestart(true);
    } else {
      setTryAgain(true);
    }
  }

  useEffect(() => {
    if (restart) {
      console.log("Correct!!")
      setTimeout(() => {
        initalSetUp();
        setCorrect(false);
        setRestart(false);
      }, 300);
    }
  }, [restart]);

  useEffect(() => {
    initalSetUp();
  }, []);

  useEffect(() => {
    if (findEmptyIndex) {
      const nextEmptyIndex = topLettersRefs.current.findIndex((ref) => ref.innerText === "");
      if (nextEmptyIndex !== -1) {
        setActiveIndex(nextEmptyIndex);
      }
      setFindEmptyIndex(false);
    }
  }, [findEmptyIndex]);

  useEffect(() => {
    if (spelling.length > 0) {
      if (spelling.every((char) => char !== "")) {
        setEnableNextStage(true);
      } else {
        setEnableNextStage(false);
      }
    }
  }, [animatingLetter]);

  console.log("LEEEngth", letterSlots.length);
  console.log("INSIDEEER", letterSlots);


  return (
    <div
      style={{ backgroundColor: "#8CB036" }}
      className="h-full p-5 flex flex-col gap-14 items-center"
    >
      <div className="w-full grid grid-cols-[95%_5%] items-center gap-2">
        <ProgressBar />
        <QuestionMarkSVG />
      </div>

    <div className="w-max flex gap-4 justify-center shadow-md items-center bg-white py-2 px-5 rounded-lg">
      <TextToSpeech buttonClass={"shadow-none"} sentence={question.answers[0]} label={"Play sound"} />
    </div>

    <div className="w-full h-32">
      <div 
        style={{ backgroundColor: "#F0F1F5" }} 
        className="shadow-md w-full h-full p-1 gap-2 items-center justify-center flex"
        
        
      >
        {
          letterSlots.length > 0 &&
          letterSlots.map((letter, i, array) => (
            <div 
              key={i + letter}
              className={`rounded-lg ${letter === "" ? "cursor-default" : "cursor-pointer"} w-full h-3/5 
                ${letter === "" && "bg-blue-700"} grid place-items-center`} 
            >
              <div 
                ref={(el) => topLettersRefs.current[i] = el}
                role={letter !== "" ? "" : correct ? "" : "button"}
                aria-pressed={activeIndex === i}
                disabled={letter !== "" ? true : correct ? true : false}
                aria-disabled={letter !== "" ? "true" : correct ? "true" : "false"}
                onClick={(e) => handleTopClick(e, i, array)}
                className={`
                  ${activeIndex === i ? "border-black border-2" : ""} 
                  ${letter !== "" ? "cursor-default" : correct ? "cursor-not-allowed" : "cursor-pointer"} 
                  rounded-lg font-bold text-2xl w-[95%] h-[95%] 
                  flex items-center justify-center bg-white
                `}
              >
                { letter !== "" ? letter : spelling[i] }
              </div>
            </div>
          ))
        }
      </div>
    </div>

    <div className="w-full h-24 flex justify-evenly items-start">
      {
        correct ?
        <h1 className="mt-10 text-6xl font-bold">{"= " + question.answers[0]}</h1>
        :
        letterSlots.length > 0 &&
        question.data.map((letter, i) => (
          letterSlots[i] === "" &&
          <>
            <div
              ref={(el) => bottomLettersRefs.current[i] = el}
              key={letter + i}
              onClick={() => handleLetterClick(letter, i)}
              className={`
                rounded-lg font-bold text-2xl w-1/4 h-4/5 
                flex items-center justify-center bg-white
              `}
              
            >
              {letter}
            </div>

            {
              !correct && animatingLetter &&
                <AnimatedTag 
                  position={animatingLetter}
                />
            }

            { 
              !correct && animatingLetter &&
                <AnimatedTag 
                  position={animatingLetter}
                />
            }
          </>
        ))
        
      }
    </div>
    
    <NextButtonRight 
      isEnabled={enableNextStage}
      className="shadow-md mt-20" 
      onClick={handleNext}
    />


    {
      tryAgain && 
        <ModalElement 
          className={"h-[44%]"}
          text={"Try Again..."}
          onClose={() => setTryAgain(false)}
          closeLabel={"Close"}
        />
    }
    </div>
  )
}

export default QuestionCompleteWordLetters;