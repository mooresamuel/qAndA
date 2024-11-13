import RepeatText from "../RepeatText/RepeatText";

function QuestionRepeatWords({ question }) {
  console.log(question);
  return (
    <div className="mt-4 space-y-8 px-8">
      <h2 className="text-center text-4xl font-semibold">
        {question.prompts[0]}
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {question.data.map((el) => (
          <RepeatText key={el} text={el} />
        ))}
      </div>
      <button className="bg-hightlight text-white w-full font-semibold text-center py-2 rounded-md">
        Next
      </button>
    </div>
  );
}

export default QuestionRepeatWords;
