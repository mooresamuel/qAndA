/* eslint-disable react/prop-types */
import { Spinner } from "react-bootstrap";
import { useSpeechToText } from "../../hooks/useSpeechToText";
import SpeakerButton from "../SpeakerButton/SpeakerButton";
import { Check, Mic, Octagon, Speaker, X } from "lucide-react";
import { useEffect } from "react";

const SpeechToTextSentence = ({ setResults, sentence, label = null }) => {
  const { startRecording, stopRecording, result, isRecording, isLoading } =
    useSpeechToText(sentence);

  useEffect(
    function () {
      setResults(result);
    },
    [result]
  );

  if (isLoading) {
    return (
      <SpeakerButton>
        <Spinner />
      </SpeakerButton>
    );
  }

  if (!isRecording && !isLoading) {
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

  if (isRecording && !isLoading)
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
};

export default SpeechToTextSentence;
