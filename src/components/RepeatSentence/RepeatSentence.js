/* eslint-disable react/prop-types */
import IndividualWord from "../IndividualWord/IndividualWord";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

function RepeatSentence({ sentence, spokenAnswer, highlightable = true }) {
  console.log("repeatSentence spokenAnswer", spokenAnswer);
  return (
    <div className=" flex gap-3 w-full items-center">
      <div className="self-start">
        <TextToSpeech sentence={sentence} />
      </div>
      <h3 className="text-center text-wrap cursor-pointer font-semibold text-slate-800">
        {sentence.split(" ").map((word, i) => (
          <IndividualWord
            key={`${word}${i}`}
            word={word}
            highlightable={highlightable}
            className={`${
              !spokenAnswer
                ? ""
                : spokenAnswer[i]?.word?.toLowerCase() ===
                    word
                      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                      .toLowerCase() && spokenAnswer[i]?.confidence > 0.7
                ? "text-green-600"
                : "text-red-500"
            }`}
          />
        ))}
      </h3>
    </div>
  );
}

export default RepeatSentence;
