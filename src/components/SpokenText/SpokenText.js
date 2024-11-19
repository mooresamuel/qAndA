/* eslint-disable react/prop-types */
import TextToSpeech from "../TextToSpeech/TextToSpeech";

function SpokenText({ text, displayText, containerClass, className, buttonClass = "",
  extendText = null, extendable = null }) {

  return (
    <div className={`flex gap-3 ${containerClass}`}>
      <TextToSpeech sentence={text} buttonClass={buttonClass} />
      <p
        className={`capitalize text-slate-700 font-semibold mb-0 flex ${className}`}
      >
        { extendable  === null ?
          displayText : extendable ? displayText : displayText.slice(0, 100) 
        
        } {
          extendText &&
          <span 
            onClick={extendText}
            className="text-blue-600 cursor-pointer inline"
          >
            {extendable ? " [less]" : "...more"}
          </span>
          
        }
      </p>
    </div>
  );
}

export default SpokenText;
