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


// const question = {
//   title: "The World We See",
//   text: `People looked at maps,
// Mrs. Brown called her class.
// 'The world is big,' she said,
// 'From land to sea, it's vast.'

// Mr. Smith showed them hills,
// And rivers that run deep.
// They saw lakes and forests,
// And mountains oh so steep.

// The class looked at cities,
// Where people rush and go.
// They called out the names,
// Of places they now know.

// From hot to cold, they learned,
// About the Earth we share.
// A world of wonder waits,
// For those who look with care.`,
//   question_type: "basic_comprehension",
//   questions: [
//     {
//       'question_id': '1',
//       'question_type': 'basic_comprehension',
//       'question_text': 'What is the central theme of the poem?',
//       'options': {
//         'a': 'The beauty of nature',
//         'b': 'The conflict between duty and desire',
//         'c': 'The loneliness of winter',
//         'd': 'The relationship between humans and animals'
//       },
//       'answers': 'b',
//       'hint': 'Consider the last stanza and the speaker\'s internal conflict.',
//       'explanation': 'The correct answer is (b) The conflict between duty and desire. Throughout the poem, the speaker is drawn to the beauty of the snowy woods, wanting to stay and observe. However, the final stanza reveals that the speaker has "promises to keep" and "miles to go," indicating responsibilities that pull them away from the allure of the woods. This tension between the desire to stay and appreciate nature and the need to fulfill obligations represents the central theme of the poem.'
//     },
//     {
//       'question_id': '2',
//       'question_type': 'basic_comprehension',
//       'question_text': 'What does the word "queer" mean in the context of the line "My little horse must think it queer"?',
//       'options': {
//         'a': 'Homosexual',
//         'b': 'Strange or odd',
//         'c': 'Exciting',
//         'd': 'Colorful'
//       },
//       'answers': 'b',
//       'hint': 'Consider how the horse might perceive the unexpected stop.',
//       'explanation': 'The correct answer is (b) Strange or odd. In this context, "queer" is used in its older sense, meaning unusual or strange. The speaker suggests that the horse finds it odd to stop in an isolated place without any apparent reason, especially on such a dark evening. This usage of "queer" emphasizes the unconventional nature of the speaker\'s actions from the horse\'s perspective.'
//     }
//   ]
// }



function QuestionBasicComprehension({
  question
}) {
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
  }

  const handleVictory = () => {
    setVictoryModal(false);
    setTimeout(() => {
      setCurrentLevel(0);
      // TODO: handle it properly when backend data is available
      navigate(`../../../`);
      // navigate(`/exercise/${exercise_id}/complete`);
    }, 400);
  }



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

        <TextToSpeech
          removeIcon={true}
          sentence={question.text} 
          label={question.text}
          labelClass={"text-lg w-screen text-left px-4 leading-8 normal-case"}
          // labelClass="text-sm bg-transparent text-hightlight font-semibold"
          // buttonClass="shadow-none text-hightlight bg-transparent mb-3 p-0 gap-0"
        />

        {/* <SpokenText 
          text={question.text}
          displayText={question.text}
          extendText={() => setIsExpanded(!isExpanded)}
          extendable={isExpanded}
          containerClass={"items-start"}
          className={"font-black mb-5 p-3 text-base flex-col rounded-lg bg-white text-black shadow-md"}
        /> */}
        
        <div className={`w-full bg-white px-4 rounded-lg text-left`}>
          {
            question.questions.map((question, index) => (
              currentStage === index &&
              <div key={index} className="mb-5">
                
                <div
                  className="mb-4"
                >
                  <TextToSpeech 
                    sentence={question.question_text} 
                    label={question.question_text}
                    labelClass="text-base text-left"
                    buttonClass="shadow-md"
                  />
                </div>


                <div className="flex flex-col items-start flex-wrap">
                  {
                    
                    Object.entries(question.options)
                      .map(([k, v], i) => (
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
                            <p className="text-base text-hightlight font-extrabold">{k}: </p>
                            <TextToSpeech 
                              sentence={v} 
                              label={v}
                              labelClass="text-sm bg-transparent text-hightlight font-semibold text-left"
                              buttonClass="shadow-none text-hightlight bg-transparent mb-3 p-0 gap-0"
                              removeIcon={true}
                            />
                          </div>
                        </div>
                    ))
                  }
                </div>
              </div>
            ))
          }

        </div>

        <NextButtonRight 
          isEnabled={isAnswerChosen}
          onClick={handleNext}
        />
        
        {
          showHint && 
            <ModalElement 
              className={"h-1/4"}
              text={question.questions[0].hint}
              onClose={() => {
                setShowHint(!showHint);
                scrollModalIntoView();
              }}
              closeLabel={"Close"}
            />
        }


        {
          tryAgain && 
            <ModalElement 
              className={"h-1/4"}
              text={"Try Again..."}
              onClose={() => setTryAgain(false)}
              closeLabel={"Close"}
            />
        }


        {
          victoryModal && 
            <ModalElement 
              className={"h-1/4"}
              text={"Congratulations!"}
              onClose={handleVictory}
              closeLabel={"Close"}
            />
        }

    </div>
  )
}

export default QuestionBasicComprehension;