import { useState, useEffect } from 'react'
import Word from '../Word/Word'
import ProgressBar from '../ProgressBar/ProgressBar'
import QuestionMarkSVG from '../QuestionMarkSVG/QuestionMarkSVG'
import SpokenText from '../SpokenText/SpokenText'
import NextButtonRight from '../NextButtonRight/NextButtonRight'

function QuestionVowelLength({
  question,
  currentLevel = 0,
  totalLevel = 5
}) {
  const [level, setLevel] = useState(currentLevel);
  const [wordSelected, setWordSelected] = useState(false);
  const [selection, setSelection] = useState(false);
  const [short, setShort] = useState(false);
  const [long, setLong] = useState(false);

  const handleLongClick = () => {
    setLong(true);
    setShort(false);
    setSelection(true);
    setWordSelected(question.data[0]);
  }
  const handleShortClick = () => {
    setShort(true);
    setLong(false);
    setSelection(true);
    setWordSelected(question.data[1]);
  }

  const handleNextClick = () => {
    if (wordSelected === question.answers[0]) {
      let tempLevel = level + 1;
      if (tempLevel <= totalLevel) {
        setLevel(tempLevel);
      } else {
        console.log("max level reached!");
      }
    } else {
      alert("WRONG ANSWER!");
    }
  }

  return (
    <div
      style={{ backgroundColor: "#8CB036" }}
      className="h-full p-5 flex flex-col gap-14 items-center"
    >
      {/* <div className="w-full grid grid-cols-[95%_5%] items-center gap-2">
        <ProgressBar currentStep={level} totalSteps={totalLevel} />
        <QuestionMarkSVG />
      </div> */}

      <div className={`flex flex-col gap-3 items-center justify-center px-4`}>
        <SpokenText text={question.prompts[0]} className={`text-lg text-center`} />
        <h1 className={`mt-5 text-7xl font-semibold`}>{question.prompts[1]}</h1>
        <div className={`grid grid-rows-[40%_30%_30%] w-full items-center gap-2 py-4`}>
          <div className={`bg-white flex items-center justify-center py-2 px-8 cursor-pointer rounded-lg shadow-md`}>
            {/* <TextToSpeech className={`shadow-none`} sentence={`Play sound`} /> */}
            <SpokenText 
              text={`Play sound`} 
              className={`text-lg bg-white font-bold`}
              shadow={`shadow-none`} />
          </div>
          <Word 
            word={question.data[0]}
            className='w-full h-auto'
            clicked={long}
            onClick={handleLongClick}
            
          />
          <Word 
            word={question.data[1]}
            className='w-full h-auto'
            clicked={short}
            onClick={handleShortClick}
          />

        </div>

        <NextButtonRight
          correct={selection}
          onClick={handleNextClick}
          className={`mt-28`}
        />
      </div>
    </div>
  )
}

export default QuestionVowelLength