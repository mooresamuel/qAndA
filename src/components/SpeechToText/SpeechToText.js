/* eslint-disable react/prop-types */
import SpeakerButton from "../SpeakerButton/SpeakerButton";
import { Mic } from "lucide-react";

const SpeechToText = ({ sentence, label = null }) => {
  return (
    <SpeakerButton className="flex gap-3 items-center p-3 w-fit">
      <Mic />
      {label && (
        <p className="font-semibold text-hightlight m-0 capitalize">{label}</p>
      )}
    </SpeakerButton>
  );
};

export default SpeechToText;
