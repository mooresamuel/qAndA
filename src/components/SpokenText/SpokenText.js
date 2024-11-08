/* eslint-disable react/prop-types */
import TextToSpeech from "../TextToSpeech/TextToSpeech";

function SpokenWord({ text, className }) {
  return (
    <div className="flex gap-3 items-center">
      <TextToSpeech sentence={text} />
      <p
        className={`capitalize text-center text-slate-700 font-semibold mb-0 ${className}`}
      >
        {text}
      </p>
    </div>
  );
}

export default SpokenWord;
