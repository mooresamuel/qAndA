import { useState, useEffect, useRef } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import AnimatedTag from "../AnimatedTag/AnimatedTag";

const data = {
  description: ['Remember that vowel sounds can be long or short. The long vowel sounds are ā, ē, ō, ĩ and ũ', 'the short ones are a, e, i, o, and u. In this acti…here. Read each word as it appears on the screen.'],
  other_topics: ['level 8 other topics'],
  phonics: ['level 8 phonics'],
  questions: [{
    answers: ["tube"],
    data: ["t", "u", "b", "e"]
  }],
  sight_words: ['level 8 sight words']
}

const questions = [{
  answers: ["tube"],
  data: ["t", "u", "b", "e"]
}];

function QuestionCompleteWordLetters(
  // questions
) {
  const { exercise } = useExerciseData();
  const [ question ] = questions;

  const topLettersRefs = useRef([]);
  const bottomLettersRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatingLetter, setAnimatingLetter] = useState(null);
  const [spelling, setSpelling] = useState(Array.from(question.data.length -1).map(() => ""));
  const [findEmptyIndex, setFindEmptyIndex] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleTopClick = (e, i, array) => {
    if (correct) {
      return;
    }

    const currentLetter = e.target.innerText;
    const bottomRefIndex = question.data.indexOf(currentLetter);

    if (i !== array.length - 1) {
      if (bottomRefIndex !== -1) {
        const topRect = topLettersRefs.current[i]?.getBoundingClientRect();
        const bottomRect = bottomLettersRefs.current[bottomRefIndex]?.getBoundingClientRect();
        setAnimatingLetter({
          letter: currentLetter,
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


  
  const handleLetterClick = (letter, index) => {

    const bottomRect = bottomLettersRefs.current[index]?.getBoundingClientRect();
    const topRect = topLettersRefs.current[activeIndex]?.getBoundingClientRect();

    if (!bottomRect || !topRect) return;

    setAnimatingLetter({
      letter,
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

  useEffect(() => {
    if (findEmptyIndex) {
      const nextEmptyIndex = topLettersRefs.current.findIndex((ref) => ref.innerText === "");
      if (nextEmptyIndex !== -1) {
        setActiveIndex(nextEmptyIndex);
      }
      setFindEmptyIndex(false);
    }
  }, [findEmptyIndex]);

  console.log(correct);

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
      <TextToSpeech shadow={"shadow-none"} sentence={question.answers[0]} label={"Play sound"} />
    </div>

    <div className="w-full h-32">
      <div 
        style={{ backgroundColor: "#F0F1F5" }} 
        className="shadow-md w-full h-full p-1 gap-2 items-center justify-center flex"
        
        
      >
        {
          question.data.map((letter, i, array) => (
            <div 
              key={i + letter}
              className={`rounded-lg $cursor-pointer w-full h-3/5 
                ${i !== array.length -1 && "bg-blue-700"} grid place-items-center`} 
            >
              <div 
                ref={(el) => topLettersRefs.current[i] = el}
                role={correct ? "" : "button"}
                aria-pressed={activeIndex === i}
                disabled={correct ? true : false}
                aria-disabled={correct ? "true" : "false"}
                onClick={(e) => handleTopClick(e, i, array)}
                className={`
                  ${activeIndex === i ? "border-black border-2" : ""} 
                  rounded-lg ${correct ? "cursor-not-allowed" : "cursor-pointer"} 
                  font-bold text-2xl w-[95%] h-[95%] 
                  flex items-center justify-center bg-white
                `}
              >
                { i === array.length - 1 ? letter : spelling[i] }
              </div>
            </div>
          ))
        }
      </div>
    </div>

    <div className="w-full h-24 flex justify-evenly items-start">
      {
        !correct ?
        question.data.map((letter, i, array) => (
          i !== array.length - 1 &&
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
                  letterPosition={animatingLetter}
                />
            }

            { 
              !correct && animatingLetter &&
                <AnimatedTag 
                  letterPosition={animatingLetter}
                />
            }
          </>
        )) :
        <h1 className="mt-10 text-6xl font-bold">{"= " + question.answers[0]}</h1>
      }
    </div>
    
    <NextButtonRight className="shadow-md mt-20" />
    </div>
  )
}

export default QuestionCompleteWordLetters;