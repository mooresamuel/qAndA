/* eslint-disable react/prop-types */
import { Spinner } from "react-bootstrap";
import { useSpeechToText } from "../../hooks/useSpeechToText";
import SpeakerButton from "../SpeakerButton/SpeakerButton";
import { Check, Mic, Octagon, RotateCw, Speaker, X } from "lucide-react";

const SpeechToTextWord = ({ word, label = null }) => {
  const { startRecording, stopRecording, result, isRecording, isLoading } =
    useSpeechToText(word);

  if (result && result[0].word.toLowerCase() === word.toLowerCase()) {
    return (
      <SpeakerButton>
        <Check />
      </SpeakerButton>
    );
  } else if (result && result[0].word.toLowerCase() !== word.toLowerCase()) {
    return (
      <SpeakerButton onClick={startRecording}>
        <RotateCw />
      </SpeakerButton>
    );
  }

  if (!isRecording && !isLoading && !result) {
    return (
      <SpeakerButton
        className="flex gap-3 items-center p-3 w-fit"
        onClick={startRecording}
      >
        <Mic />
        {label && (
          <p className="font-semibold text-hightlight m-0 capitalize">
            {label}
          </p>
        )}
      </SpeakerButton>
    );
  }

  if (isRecording && !isLoading && !result)
    return (
      <SpeakerButton
        className="flex gap-3 items-center p-3 w-fit"
        onClick={stopRecording}
      >
        <Octagon />
        {label && (
          <p className="font-semibold text-hightlight m-0 capitalize">
            {label}
          </p>
        )}
      </SpeakerButton>
    );

  if (isLoading) {
    return (
      <SpeakerButton>
        <Spinner />
      </SpeakerButton>
    );
  }
};

export default SpeechToTextWord;
