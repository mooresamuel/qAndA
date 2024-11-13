/* eslint-disable react/prop-types */
import { Spinner } from "react-bootstrap";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import SpeakerButton from "../SpeakerButton/SpeakerButton";
import SpeakerIcon from "../SpeakerIcon/SpeakerIcon";

const TextToSpeech = ({ sentence, label = null }) => {
  const { speak, isLoading } = useTextToSpeech();
  const handlePlay = (e) => {
    e.preventDefault();
    speak(sentence);
  };

  return (
    <SpeakerButton
      className="flex gap-3 items-center p-3 w-fit"
      onClick={handlePlay}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : <SpeakerIcon />}
      {label && (
        <p className="font-semibold text-hightlight m-0 capitalize">{label}</p>
      )}
    </SpeakerButton>
  );
};

export default TextToSpeech;
