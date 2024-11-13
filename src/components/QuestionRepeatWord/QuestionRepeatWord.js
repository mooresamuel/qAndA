import NextButton from "../NextButton/NextButton";
import SpeakerButton from "../SpeakerButton/SpeakerButton";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

function QuestionRepeatWord({ question }) {
  return (
    <div className="h-full flex flex-col justify-between items-center gap-3">
      <h2 className="text-center">{question.prompts[0]}</h2>

      <div className="flex flex-col gap-3 w-full items-center">
        <TextToSpeech sentence={question.data[0]} label={"play sound"} />
        <NextButton />
      </div>
    </div>
  );
}

export default QuestionRepeatWord;
