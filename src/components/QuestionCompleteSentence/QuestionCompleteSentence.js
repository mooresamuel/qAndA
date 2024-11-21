import { useEffect, useState, useRef } from "react";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";
import AnimatedTag from "../AnimatedTag/AnimatedTag";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import ModalElement from "../ModalElement/ModalElement";

function QuestionCompleteSentence({ question }) {
  const { handleNextQuestion, handleAddMistake } = useExerciseData();
  const topGapRefs = useRef([]);
  const bottomWordRefs = useRef([]);

  const [answers, setAnswers] = useState(
    Array.from(question.answers, () => false)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingWord, setAnimatingWord] = useState(null);
  const [enable, setEnabled] = useState(false);
  const splitSentence = question.prompts[0].split("%");
  const [tryAgain, setTryAgain] = useState(false);
  const _allGapsIndex = splitSentence.map((w, i) => w === "//gap//" ? i : null)
                                    .filter(i => i !== null);

  const correctSentence = question.prompts[0]
    .replaceAll("%//", "")
    .replaceAll("//%", "");


  function handleAnswerPicked(answer, index) {
    if (answers.every(word => typeof word === "string")) {
      return;
    }

    let tempIndex = currentIndex;
    const gapIndex = _allGapsIndex[tempIndex];
    const topRect = topGapRefs.current[gapIndex]?.getBoundingClientRect();
    const bottomRect = bottomWordRefs.current[index]?.getBoundingClientRect();
    

    if (!bottomRect || !topRect) return;

    setAnimatingWord({
      content: answer,
      start: bottomRect,
      end: topRect,
    });
    
    if (tempIndex === 0) {
      setCurrentIndex(1)
    } else {
      setCurrentIndex(0);
    }

    const arrAnswers = answers.map((el, i) => {
      if (i === tempIndex) {
        return answer
      } else {
        return el;
      }
    });

    setTimeout(() => {
      setAnimatingWord(null);
      setAnswers(arrAnswers);
    }, 400);

    if (question.answers[+tempIndex] !== answer) {
      handleAddMistake({
        mistake: `word ${answer} placed in gap ${+tempIndex + 1}`,
      });
    }
  }

  function removeAnswer(index, trackIndex, word) {
    const findWord = answers.find((word, i) => {
      if (i === index) {
        if (typeof word === "string") {
          return word;
        }
      } else {
        return false;
      }
    });

    if (!findWord) {
      return
    }
  
    const tempAnswers = [...answers].map((el, i) => (i === index ? false : el))

    const findEmptyIndex = tempAnswers.findIndex(word => word === false);

    if (findEmptyIndex !== -1) {
      setCurrentIndex(findEmptyIndex);
    } else {
      let tempIndex, seeAnswer;

      if (index === 0) {
        tempIndex = index + 1;
        seeAnswer = answers[tempIndex];
        if (seeAnswer === false) {
          setCurrentIndex(tempIndex)
        }
      } else {
        tempIndex = index - 1;
        seeAnswer = answers[tempIndex];
        if (seeAnswer === false) {
          setCurrentIndex(tempIndex)
        }
      }
    }


    const topRect = topGapRefs.current[trackIndex]?.getBoundingClientRect();
    let bottomRect = null;
    if (findWord) {
      const findIndexBottomSide = question.data.findIndex(w => w === findWord.trim());
      bottomRect = bottomWordRefs.current[findIndexBottomSide]?.getBoundingClientRect();
    }

    if (!bottomRect || !topRect) return;

    setAnimatingWord({
      content: findWord.trim(),
      start: topRect,
      end: bottomRect,
    });
    setAnswers(tempAnswers);

    setTimeout(() => {
      setAnimatingWord(null);
    }, 400);
  }

  const handleNext = () => {
    if (answers.join("").trim() === question.answers.join("").trim()) {
      setEnabled(false);
      setAnswers([false, false]);
      handleNextQuestion();
    } else {
      setTryAgain(true);
      setEnabled(false);
    }
  }

  useEffect(() => {
    if (answers.length > 0) {
      if (answers.every((item) => typeof item === "string" && item !== false)) {
        setEnabled(true)
      } else {
        setEnabled(false);
      }
    }
  }, [answers]);

  let upperIndex = 0;

  return (
    <div className="flex flex-col h-full justify-between items-center ">
      <div 
        style={{ backgroundColor: "#8CB036" }}
        className="w-full grid grid-cols-[95%_5%] items-center gap-2 px-3 py-4">
        <ProgressBar />
        <QuestionMarkSVG />
      </div>
      <div className="space-y-16">
        <div className="flex items-center gap-3 text-lg px-3 py-5 bg-gray-100">
          <TextToSpeech sentence={correctSentence} />
          <p className="m-0 align-middle text-hightlight">
            {splitSentence.map((chunk, traceIndex, array) => {
              if (chunk.startsWith("//") && chunk.endsWith("//")) {
                let index = upperIndex;
                upperIndex++;
                return (
                  <button
                    ref={(el) => topGapRefs.current[traceIndex] = el}
                    key={traceIndex}
                    className={`${traceIndex === _allGapsIndex[currentIndex] && "border-hightlight"}
                        w-20 border-2 h-16 shadow-md rounded-md align-middle
                    `}
                    onClick={() => removeAnswer(index, traceIndex, chunk)}
                  >
                    {answers[index]}
                  </button>
                );
              } else {
                return (
                  <span key={traceIndex} className="align-middle">
                    {chunk}
                  </span>
                );
              }
            })}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          {question.data.map((option, i) => (
            <button
              onClick={() => handleAnswerPicked(option, i)}
              className="flex items-center gap-3"
            >
              <TextToSpeech key={i} sentence={option} />
              <p 
                ref={(el) => bottomWordRefs.current[i] = el}
                className="text-hightlight font-semibold m-0 px-2 py-3 rounded-md shadow-md h-full"
              >
                {option}
              </p>
            </button>
          ))}
            {
              !enable && animatingWord &&
                <AnimatedTag 
                  position={animatingWord}
                />
            }

            { 
              !enable && animatingWord &&
                <AnimatedTag 
                  position={animatingWord}
                />
            }
        </div>
      </div>
      <div
        className="w-full h-1/3 px-5"
      >
        <NextButtonRight
          isEnabled={enable}
          className={"mt-28"}
          onClick={handleNext}
        />
      </div>

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
  );
}

export default QuestionCompleteSentence