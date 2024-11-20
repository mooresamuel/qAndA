/* eslint-disable react/prop-types */
import TextToSpeech from "../TextToSpeech/TextToSpeech";

function SpokenText({ text, containerClass, className, buttonClass = "" }) {

  return (
    <div className={`flex gap-3 ${containerClass}`}>
      <TextToSpeech sentence={text} buttonClass={buttonClass} />
      <p
        className={`capitalize text-slate-700 font-semibold mb-0 ${className}`}
      >
        {text}
      </p>
    </div>
  );
}

export default SpokenText;
