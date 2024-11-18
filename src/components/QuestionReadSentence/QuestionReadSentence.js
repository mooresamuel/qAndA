import { useExerciseData } from "../../Contexts/ExerciseContext";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import SpokenText from "../SpokenText/SpokenText";
// import SpeechToText from "../SpeechToText/SpeechToText";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";

function QuestionReadSentence({ question }) {
  const { handleNextQuestion } = useExerciseData();

  return (
    <div className="h-full flex flex-col justify-between items-center gap-3">
      <ProgressBar />

      <div className="flex items-center flex-col gap-3">
        <SpokenText
          text={"Read the following sentence"}
          className={"text-2xl"}
        />
        <h3 className="text-center">{question.data[0]}</h3>
      </div>

      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex gap-3">
          <TextToSpeech sentence={question.data[0]} label={"play sound"} />
          {/* <SpeechToText sentence={question.data[0]} /> */}
        </div>
        <NextButtonRight onClick={handleNextQuestion} />
      </div>
    </div>
  );
}

export default QuestionReadSentence;
