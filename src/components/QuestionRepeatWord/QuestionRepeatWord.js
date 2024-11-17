import NextButton from "../NextButton/NextButton";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import SpokenText from "../SpokenText/SpokenText";

function QuestionRepeatWord({ question }) {
  //navigate(`../steps/${questions[currentLevel].question_number}`);
  console.log("repeat", question.data.length);
  return (
    <div className="h-full flex flex-col justify-between items-center gap-3">
      <h2 className="text-center">{question.prompts[0]}</h2>

      <div className="flex flex-col gap-3 w-full items-center">
        {
          question.data.map((word, i) => (
            <div key={i + word} className="flex gap-3">
              <SpokenText text={word} />
              {/* <TextToSpeech sentence={word} label={"play sound"} /> */}
              {/* <p>{word}</p> */}
            </div>
          ))
        }
        {/* <TextToSpeech sentence={question.data[0]} label={"play sound"} /> */}
        <NextButton />
      </div>
    </div>
  );
}

export default QuestionRepeatWord;
