import { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";
import AnimatedTag from "../AnimatedTag/AnimatedTag";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import ModalElement from "../ModalElement/ModalElement";

// const question = {
//   answers: ['because', "done", "tasks", "the"],
//   data: ['tasks', "the", 'because', "done"],
//   prompts: ['She felt happy %//gap//% she had %//gap//% all her %//gap//% before the end of %//gap//% day.'],
//   question_id: 12,
//   question_number: 1,
//   question_type: "complete_sentence"
// }

// const question = {
//   "question_id": "1",
//   "question_type": "complete-sentence",
//   "prompts": [
//       "The %//gap//% was walking to the %//gap//% when she saw a %//gap//% standing near her %//gap//%, so she decided to %//gap//% back."
//   ],
//   "gaps": 5,
//   "data": [
//       "girl",
//       "store",
//       "bird",
//       "home",
//       "turn"
//   ],
//   "answers": [
//       "girl",
//       "store",
//       "bird",
//       "home",
//       "turn"
//   ]
// }

function QuestionCompleteSentence({ question }) {
  const { setSelector, element } = useGlobalContext();
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
  const _allGapsIndex = splitSentence
    .map((w, i) => (w === "//gap//" ? i : null))
    .filter((i) => i !== null);

  const [speechArray, setSpeechArray] = useState(
    question.prompts[0].split("%")
  );
  const [speech, setSpeech] = useState("");
  const [reset, setReset] = useState(false);

  function handleAnswerPicked(answer, index) {
    if (answers.every((word) => typeof word === "string")) {
      return;
    }

    let tempIndex = currentIndex;
    const arrAnswers = answers.map((el, i) => {
      if (i === tempIndex) {
        return answer;
      } else {
        return el;
      }
    });

    const tempGapIndex = _allGapsIndex[tempIndex];

    const tempSpeechArray = speechArray.map((word, i, arr) => {
      if (i === tempGapIndex) {
        return answer;
      } else {
        return word;
      }
    });

    setSpeechArray(tempSpeechArray);

    const findEmptyIndex = arrAnswers.findIndex((word) => word === false);
    const gapIndex = _allGapsIndex[tempIndex];
    const topRect = topGapRefs.current[gapIndex]?.getBoundingClientRect();
    const bottomRect = bottomWordRefs.current[index]?.getBoundingClientRect();

    if (!bottomRect || !topRect) return;

    setAnimatingWord({
      content: answer,
      start: bottomRect,
      end: topRect,
    });

    setCurrentIndex(findEmptyIndex);
    setTimeout(() => {
      setAnimatingWord(null);
      setAnswers(arrAnswers);
    }, 400);

    if (question.answers[+tempIndex] !== answer) {
      // no idea what this is, but will move to handleNext function
      // handleNext happens when they press Next button and checks first if they are correct or not
      // therefore it is best to keep this function over there
      // handleAddMistake({
      //   mistake: `word ${answer} placed in gap ${+tempIndex + 1}`,
      // });
    }
  }

  function removeAnswer(index, trackIndex, word) {
    const findWord = answers.find((word, i) => {
      return i === index && typeof word === "string";
    });

    if (!findWord) {
      setCurrentIndex(index);
      return;
    }

    const tempSpeechArray = speechArray.map((word, i, arr) => {
      if (i === trackIndex) {
        return "%//gap//%";
      } else {
        return word;
      }
    });

    setSpeechArray(tempSpeechArray);

    const tempAnswers = [...answers].map((el, i) => (i === index ? false : el));

    const findEmptyIndex = tempAnswers.findIndex((word) => word === false);

    if (findEmptyIndex !== -1) {
      setCurrentIndex(findEmptyIndex);
    }

    const topRect = topGapRefs.current[trackIndex]?.getBoundingClientRect();
    let bottomRect = null;
    if (findWord) {
      const findIndexBottomSide = question.data.findIndex(
        (w) => w === findWord.trim()
      );
      bottomRect =
        bottomWordRefs.current[findIndexBottomSide]?.getBoundingClientRect();
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
      handleNextQuestion();
      setReset(true);
    } else {
      setTryAgain(true);
      setEnabled(false);
      answers.forEach((answer, index) => {
        handleAddMistake({
          mistake: `word ${answer} placed in gap ${index}`,
        });
      });
    }
  };

  useEffect(() => {
    if (reset) {
      setTimeout(() => {
        setEnabled(false);
        setAnswers([false, false]);
        const newSpeechArray = question.prompts[0].split("%");
        const newSpeech = newSpeechArray.join("").replace(/%\/\/|\/\/%/g, "");
        setSpeechArray(newSpeechArray);
        setSpeech(newSpeech);
        setCurrentIndex(0);
        setReset(false);
      }, 0);
    }
  }, [reset]);

  useEffect(() => {
    const updatedSpeech = speechArray.join("").replace(/%\/\/|\/\/%/g, "");
    console.log("updatedSpeech", updatedSpeech);
    setSpeech(updatedSpeech);
  }, [speechArray]);

  useEffect(() => {
    if (answers.length > 0) {
      if (answers.every((item) => typeof item === "string" && item !== false)) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    }
  }, [answers]);

  let fakeIndex = 0;

  console.log("Wath", element, " Ok");

  return (
    <div
      id="complete_sentence"
      className="flex flex-col h-full justify-between items-center"
      onClick={() => setSelector("#complete_sentence")}
    >
      {/* <div 
        style={{ backgroundColor: "#8CB036" }}
        className="w-full grid grid-cols-[95%_5%] items-center gap-2 px-3 py-4">
        <ProgressBar />
        <QuestionMarkSVG />
      </div> */}
      <div className="space-y-16 px-2">
        <div className="flex items-center gap-3 text-base px-3 py-5 bg-gray-100">
          <TextToSpeech sentence={speech} />
          <div className="m-0 items-center flex flex-row flex-wrap gap-y-3 gap-x-2 text-hightlight">
            {splitSentence.map((chunk, traceIndex, array) => {
              if (chunk.startsWith("//") && chunk.endsWith("//")) {
                let index = fakeIndex;
                fakeIndex++;
                return (
                  <button
                    ref={(el) => (topGapRefs.current[traceIndex] = el)}
                    key={traceIndex + chunk}
                    className={`${
                      traceIndex === _allGapsIndex[currentIndex] &&
                      "border-hightlight"
                    }
                        w-20 border-2 h-16 shadow-md rounded-md align-middle
                    `}
                    onClick={() => removeAnswer(index, traceIndex, chunk)}
                  >
                    {answers[index]}
                  </button>
                );
              } else {
                return (
                  <div>
                    <span key={traceIndex} className="w-fit">
                      {chunk}
                    </span>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          {question.data.map((option, i) => (
            <button
              key={i + option + Math.floor(Math.random() * 5)}
              onClick={() => handleAnswerPicked(option, i)}
              className="flex items-center gap-3"
            >
              <TextToSpeech key={i} sentence={option} />
              <span
                ref={(el) => (bottomWordRefs.current[i] = el)}
                className="text-hightlight font-semibold m-0 px-2 py-3 rounded-md shadow-md h-full"
              >
                {option}
              </span>
            </button>
          ))}
          {!enable && animatingWord && <AnimatedTag position={animatingWord} />}

          {!enable && animatingWord && <AnimatedTag position={animatingWord} />}
        </div>
      </div>
      <div className="w-full h-1/3 px-5">
        <NextButtonRight
          isEnabled={enable}
          className={"mt-28"}
          onClick={handleNext}
        />
      </div>

      {tryAgain && (
        <ModalElement
          className={"h-[44%]"}
          text={"Try Again..."}
          onClose={() => setTryAgain(false)}
          closeLabel={"Close"}
        />
      )}
    </div>
  );
}

export default QuestionCompleteSentence;
