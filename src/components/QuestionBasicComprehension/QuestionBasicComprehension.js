import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import { scrollModalIntoView } from "../../utils/helperFunctions";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import SpokenText from "../SpokenText/SpokenText";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ModalElement from "../ModalElement/ModalElement";
import SpeakerButton from "../SpeakerButton/SpeakerButton";

const question = {
  title: "The Marathon Spirit",
  text: "One woman knew she had to work harder for the marathon. Because of her love for running, she trained daily. Two other runners helped her stay sure of success.",
  text_topic: "sport",
  focus_words: ["one", "knew", "work", "because", "love", "two", "sure"],
  questions: [
    {
      question_id: "1",
      question_type: "basic_comprehension",
      question_text: "What sport is the main focus of this text?",
      options: {
        a: "Swimming",
        b: "Marathon running",
        c: "Cycling",
        d: "Hiking",
      },
      correct_answer: "b",
      hint: "Look for words related to the type of sport mentioned in the text.",
      explanation:
        "The text specifically mentions 'marathon' and 'running', indicating that marathon running is the main sport being discussed. This is reinforced by references to training for this specific athletic event.",
    },
    {
      question_id: "2",
      question_type: "basic_comprehension",
      question_text: "What does 'stay sure of success' mean in this context?",
      options: {
        a: "To remain confident",
        b: "To stay physically strong",
        c: "To win the race",
        d: "To finish training",
      },
      correct_answer: "a",
      hint: "Think about the mental state this phrase describes.",
      explanation:
        "The phrase 'stay sure of success' means to maintain confidence in one's ability to achieve goals. In the context, other runners helped the woman maintain her confidence while training for the marathon.",
    },
    {
      question_id: "3",
      question_type: "Main idea identification",
      question_text: "What is the main theme of this text?",
      options: {
        a: "Winning competitions",
        b: "Making friends",
        c: "Dedication and support in sports",
        d: "Marathon rules",
      },
      correct_answer: "c",
      hint: "Consider both the individual's efforts and the role of others.",
      explanation:
        "The main theme combines both personal dedication ('work harder,' 'trained daily') and support from others ('two other runners helped'), making it a story about dedication and support in pursuing athletic goals.",
    },
  ],
};

function QuestionBasicComprehension() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { setCurrentLevel } = useExerciseData();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [pick, setPick] = useState("");
  const [isAnswerChosen, setIsAnswerChosen] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // Place this in context when real data arrives
  const [victoryModal, setVictoryModal] = useState(false);

  const handleNext = () => {
    if (pick !== question.questions[0].answers) {
      setTryAgain(true);
      scrollModalIntoView();
    } else {
      const level = currentStage + 1;
      if (level < question.questions.length) {
        setCurrentStage(level);
        setCurrentLevel(level);
        ref.current.scrollIntoView({ behavior: "instant", block: "start" });
        navigate(`../steps/${question.questions[level].question_id}`);
      } else {
        setCurrentLevel(level);
        setVictoryModal(true);
        scrollModalIntoView();
      }
    }
  };

  const handleVictory = () => {
    setVictoryModal(false);
    setTimeout(() => {
      setCurrentLevel(0);
      // TODO: handle it properly when backend data is available
      navigate(`../../../`);
      // navigate(`/exercise/${exercise_id}/complete`);
    }, 400);
  };

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#8CB036" }}
      className="h-full p-5 flex flex-col gap-14 items-center relative"
    >
      <div className="w-full grid grid-cols-[95%_5%] items-center gap-2">
        <ProgressBar />
        <QuestionMarkSVG
          handleClick={() => {
            setShowHint(!showHint);
            scrollModalIntoView();
          }}
        />
      </div>

      <TextToSpeech
        sentence={question.title}
        label={question.title}
        buttonClass="text-3xl"
      />

      <div className="flex gap-3 ">
        <TextToSpeech sentence={question.text} />
        <SpeakerButton className="font-semibold text-hightlight">
          <p>{question.text}</p>
          {/* <TextToSpeech
          removeIcon={true}
          sentence={question.text}
          label={question.text}
          labelClass={"text-lg w-screen text-left px-4 leading-8 normal-case"}
          // labelClass="text-sm bg-transparent text-hightlight font-semibold"
          // buttonClass="shadow-none text-hightlight bg-transparent mb-3 p-0 gap-0"
        /> */}
        </SpeakerButton>
      </div>

      {/* <SpokenText 
          text={question.text}
          displayText={question.text}
          extendText={() => setIsExpanded(!isExpanded)}
          extendable={isExpanded}
          containerClass={"items-start"}
          className={"font-black mb-5 p-3 text-base flex-col rounded-lg bg-white text-black shadow-md"}
        /> */}

      <div className={`w-full bg-white px-4 rounded-lg text-left`}>
        {question.questions.map(
          (question, index) =>
            currentStage === index && (
              <div key={index} className="mb-5">
                <div className="mb-4">
                  <TextToSpeech
                    sentence={question.question_text}
                    label={question.question_text}
                    labelClass="text-base text-left"
                    buttonClass="shadow-md"
                  />
                </div>

                <div className="flex flex-col items-start flex-wrap">
                  {Object.entries(question.options).map(([k, v], i) => (
                    <div
                      key={k + "=" + v}
                      className="flex justify-center items-center"
                    >
                      <input
                        type="radio"
                        name={`question_${question.question_id}`}
                        id={`option_${i}`}
                        className="mr-2 mb-3 w-5 h-5"
                        onClick={() => {
                          setPick(k);
                          setIsAnswerChosen(true);
                        }}
                      />
                      <div className="flex justify-center items-center">
                        <p className="text-base text-hightlight font-extrabold">
                          {k}:{" "}
                        </p>
                        <TextToSpeech
                          sentence={v}
                          label={v}
                          labelClass="text-sm bg-transparent text-hightlight font-semibold text-left"
                          buttonClass="shadow-none text-hightlight bg-transparent mb-3 p-0 gap-0"
                          removeIcon={true}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>

      <NextButtonRight isEnabled={isAnswerChosen} onClick={handleNext} />

      {showHint && (
        <ModalElement
          className={"h-1/3"}
          text={question.questions[0].hint}
          onClose={() => {
            setShowHint(!showHint);
            scrollModalIntoView();
          }}
          closeLabel={"Close"}
        />
      )}

      {tryAgain && (
        <ModalElement
          className={"h-1/4"}
          text={"Try Again..."}
          onClose={() => setTryAgain(false)}
          closeLabel={"Close"}
        />
      )}

      {victoryModal && (
        <ModalElement
          className={"h-1/4"}
          text={"Congratulations!"}
          onClose={handleVictory}
          closeLabel={"Close"}
        />
      )}
    </div>
  );
}

export default QuestionBasicComprehension;
