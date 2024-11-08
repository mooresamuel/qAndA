/* eslint-disable react/prop-types */
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import Word from "./Word";

function Sentence({ sentence, highlightable = true }) {
  return (
    <div className=" flex gap-3 w-full items-center">
      <div className="self-start">
        <TextToSpeech sentence={sentence} />
      </div>
      <p className="text-lg text-wrap cursor-pointer font-semibold text-slate-800">
        {sentence.split(" ").map((word, i) => (
          <Word key={`${word}${i}`} word={word} highlightable={highlightable} />
        ))}
      </p>
    </div>
  );
}

export default Sentence;
