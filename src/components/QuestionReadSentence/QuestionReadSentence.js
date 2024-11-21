import { useExerciseData } from "../../Contexts/ExerciseContext";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import SpokenText from "../SpokenText/SpokenText";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";
import SpeechToTextSentence from "../SpeechToTextSentence/SpeechToTextSentence";
import RepeatSentence from "../RepeatSentence/RepeatSentence";
import { useEffect, useState } from "react";

function QuestionReadSentence({ question }) {
  const [spokenAnswer, setSpokenAnswer] = useState(null);
  const { handleNextQuestion, handleAddMistake, currentQuestion } =
    useExerciseData();

  return (
    <div className="h-full flex flex-col justify-between items-center gap-3">
      <div className="mt-4 space-y-5">
        <ProgressBar />

        <div className="flex items-center flex-col gap-3">
          <SpokenText
            text={"Read the following sentence"}
            className={"text-2xl"}
          />
          <RepeatSentence
            spokenAnswer={spokenAnswer}
            sentence={question.data[0]}
          />
          {/* <h3 className="text-center">{question.data[0]}</h3> */}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex gap-3">
          {/* <TextToSpeech sentence={question.data[0]} label={"play sound"} /> */}
          <SpeechToTextSentence
            sentence={question.data[0]}
            label={"speak"}
            setResults={setSpokenAnswer}
          />
        </div>
        <NextButtonRight onClick={handleNextQuestion} />
      </div>
    </div>
  );
}

export default QuestionReadSentence;
