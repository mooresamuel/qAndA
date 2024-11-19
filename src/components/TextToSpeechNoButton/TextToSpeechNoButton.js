import React from 'react'
import useTextToSpeech from '../../hooks/useTextToSpeech';

function TextToSpeechNoButton({ sentence, className }) {
  const { speak } = useTextToSpeech();
  const handlePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    speak(sentence);
  };
  return (
    <div className={`flex gap-3 items-center ${className}`} onClick={handlePlay}>
      
      <p
        className={`capitalize text-slate-700 font-semibold mb-0 ${className}`}
      >
        {sentence}
      </p>
    </div>
  )
}

export default TextToSpeechNoButton;