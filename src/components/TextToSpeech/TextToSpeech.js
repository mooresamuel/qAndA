/* eslint-disable react/prop-types */
import { Spinner } from "react-bootstrap";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import SpeakerButton from "../SpeakerButton/SpeakerButton";
import SpeakerIcon from "../SpeakerIcon/SpeakerIcon";

const TextToSpeech = ({ sentence }) => {
  const { speak, isLoading } = useTextToSpeech();
  const handlePlay = (e) => {
    e.preventDefault();
    speak(sentence);
  };

  return (
    <SpeakerButton onClick={handlePlay} disabled={isLoading}>
      {isLoading ? <Spinner /> : <SpeakerIcon />}
    </SpeakerButton>
  );
};

export default TextToSpeech;
