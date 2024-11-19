/* eslint-disable react/prop-types */
import { Spinner } from "react-bootstrap";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import SpeakerButton from "../SpeakerButton/SpeakerButton";
import SpeakerIcon from "../SpeakerIcon/SpeakerIcon";

const TextToSpeech = ({ sentence, buttonClass, labelClass, label = null, removeIcon = false }) => {
  const { speak, isLoading } = useTextToSpeech();
  const handlePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    speak(sentence);
  };

  return (
    <SpeakerButton
      className={`flex gap-3 items-center p-3 w-fit ${buttonClass}`}
      onClick={handlePlay}
      disabled={isLoading}
    >
      { removeIcon !== true ?
      isLoading ? <Spinner /> : <SpeakerIcon /> : null}
      {label && (
        <p className={`font-semibold text-hightlight m-0 capitalize ${labelClass}`}>{label}</p>
      )}
    </SpeakerButton>
  );
};

export default TextToSpeech;
