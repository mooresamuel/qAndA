import { useState, useEffect } from "react";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import NextButtonRight from "../NextButtonRight/NextButtonRight";

function QuestionFindWord({ question }) {
  const { handleNextQuestion } = useExerciseData();
  const [shuffledData, setShuffledData] = useState([]);
  const [restart, setRestart] = useState(false);
  const [pickIndex, setPickIndex] = useState([]);
  const [enableNextStage, setEnableNextStage] = useState(false);

  const handleClick = (index) => {
    setPickIndex((prevIndex) => {
      if (prevIndex.includes(index)) {
        return prevIndex.filter((w) => w !== index);
      } else {
        return [...prevIndex, index];
      }
    });
  };

  const handleNext = () => {
    setEnableNextStage(false);

    setTimeout(() => {
      handleNextQuestion();
      setPickIndex([]);
      setShuffledData([]);
      setRestart(true);
    }, 200);
  };

  useEffect(() => {
    if (shuffledData.length === 0) {
      setShuffledData([...question.data].sort(() => Math.random() - 0.5));
    }
  }, [restart]);

  useEffect(() => {
    if (pickIndex.length > 0) {
      const allWords = shuffledData.filter((f) => f === question.answers[0]);
      const pickedWords = pickIndex.map((index) => shuffledData[index]);
      if (pickedWords.length === allWords.length) {
        if (allWords.every((word, i) => word === pickedWords[i])) {
          setEnableNextStage(true);
        }
      } else {
        setEnableNextStage(false);
      }
    }
  }, [pickIndex]);

  return (
    <div
      // style={{ backgroundColor: "#8CB036" }}
      className="h-full items-center"
    >
      {/* <div className="w-full h-16 px-3 grid grid-cols-[95%_5%] items-center gap-2">
        <ProgressBar />
        <QuestionMarkSVG />
      </div> */}

      <div className="w-full bg-white h-full p-4">
        <div
          style={{
            gridTemplateAreas: `
              "ball0 . ball1 . ball2"
              "ball3 img img img ball4"
              "ball5 img img img ball6"
              "ball7 . ball8 . ball9"
            `,
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
          className="w-full h-[60%] relative px-3 grid place-items-center gap-2"
        >
          <div style={{ gridArea: "img" }} className="absolute w-full h-full">
            <img
              className="w-full h-full object-contain"
              src={`${process.env.PUBLIC_URL}/assets/img/download.png`}
              alt={"alt-img"}
            />

            <div className="absolute w-full h-full flex items-center bottom-[0%] justify-center z-30">
              <h1 className="text-4xl font-extrabold">{question.answers[0]}</h1>
            </div>
          </div>

          {shuffledData.length > 0 &&
            shuffledData.map((word, i) => {
              const slightShift = {
                down: [1],
                right: [0, 4, 6, 7],
                left: [2, 3, 5, 9],
                up: [8],
              };
              const translateRight = "translateX(15px)";
              const translateDown = "translateY(15px)";
              const translateLeft = "translateX(-15px)";
              const translateUp = "translateY(-15px)";

              let translate = "";

              if (slightShift.down.includes(i)) {
                translate = translateDown;
              } else if (slightShift.right.includes(i)) {
                translate = translateRight;
              } else if (slightShift.left.includes(i)) {
                translate = translateLeft;
              } else if (slightShift.up.includes(i)) {
                translate = translateUp;
              }

              return (
                <div
                  style={{
                    gridArea: "ball" + i,
                    transform: translate,
                  }}
                  key={word + " " + Math.floor(Math.random() * i) + i}
                  className={`${
                    pickIndex.includes(i)
                      ? "border-blue-600 border-1"
                      : "border-transparent border-0 text-black"
                  }
                            w-20 h-20 flex items-center justify-center 
                            rounded-full text-base font-bold shadow-md`}
                  onClick={() => handleClick(i)}
                >
                  <div
                    className={`
                    w-[76px] h-[76px] flex items-center justify-center
                    rounded-full font-bold 
                    ${
                      pickIndex.includes(i)
                        ? "bg-hightlight text-white"
                        : "bg-ball-color text-black"
                    } `}
                  >
                    {word}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="px-3">
          <NextButtonRight
            isEnabled={enableNextStage}
            className="shadow-md mt-20"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionFindWord;
