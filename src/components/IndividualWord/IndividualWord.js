/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { wordHelperFetch } from "../../services/wordHelperAPI";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import SpokenText from "../SpokenText/SpokenText";
import FullPageSpinner from "../FullPageSpinner/FullPageSpinner";
import { useExerciseData } from "../../Contexts/ExerciseContext";

/* eslint-disable react/prop-types */
function IndividualWord({ word, spokenAnswer, className = "" }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coachData, setCoachData] = useState({});
  const { handleAddMistake, currentQuestion } = useExerciseData();

  const correctlyPronounced =
    spokenAnswer &&
    spokenAnswer?.word
      ?.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") ===
      word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() &&
    spokenAnswer?.confidence > 0.7;

  useEffect(
    function () {
      if (spokenAnswer && !correctlyPronounced) {
        handleAddMistake({
          question_id: currentQuestion.question_id,
          mistake: word,
        });
      }
    },
    [spokenAnswer]
  );

  function handleClose() {
    setShow(false);
  }

  async function handleShow() {
    if (!correctlyPronounced) {
      try {
        setIsLoading(true);
        const helpData = await wordHelperFetch(word);
        setCoachData(helpData);
        setShow(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <span
        onClick={handleShow}
        className={`inline-block pr-1 ${className} ${
          !spokenAnswer
            ? "text-black"
            : correctlyPronounced
            ? "text-green-600"
            : " text-red-500 hover:text-red-500 hover:scale-105 transition-transform duration-200 transform"
        }`}
      >
        {`${word} `}
      </span>
      {isLoading && <FullPageSpinner />}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="capitalize">
            <SpokenText size="xl" text={word} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-5 w-full">
          <div>
            <SpokenText highlightable={false} text={coachData?.description} />
          </div>
          <div>
            <SpokenText
              highlightable={false}
              text={coachData?.example_sentence}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {coachData?.similar_sounds?.split(",").map((word, id) => (
              <SpokenText key={id} text={word} />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IndividualWord;
