import { Mic } from "lucide-react";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

function RepeatWord({ text }) {
  return (
    <div className="flex gap-3 items-center w-full">
      <TextToSpeech sentence={text} />
      <p className=" h-full px-4 py-2 rounded-md shadow-md text-lg font-semibold text-hightlight m-0 w-full flex justify-between">
        {text}
        <Mic />
      </p>
    </div>
  );
}

export default RepeatWord;
