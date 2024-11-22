import TextToSpeech from "../TextToSpeech/TextToSpeech";
import SpeechToTextWord from "../SpeechToTextWord/SpeechToTextWord";

function RepeatWord({ text }) {
  return (
    <div className="flex gap-3 items-center w-full">
      <TextToSpeech sentence={text} />
      <p className=" h-full px-4 py-2 bg-white rounded-md shadow-md text-lg font-semibold text-hightlight m-0 w-full flex items-center capitalize justify-between">
        {text}
        <SpeechToTextWord word={text} />
      </p>
    </div>
  );
}

export default RepeatWord;
