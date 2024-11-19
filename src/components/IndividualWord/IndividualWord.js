/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { wordHelperFetch } from "../../services/wordHelperAPI";
// import SpokenWord from "./SpokenWord";
// import Sentence from "./Sentence";

/* eslint-disable react/prop-types */
function IndividualWord({ word, highlightable, className = "" }) {
  const [show, setShow] = useState(false);
  const [coachData, setCoachData] = useState({});

  function handleClose() {
    setShow(false);
  }

  async function handleShow() {
    if (highlightable) {
      const helpData = await wordHelperFetch(word);
      setCoachData(helpData);
      setShow(true);
    }
  }

  return (
    <>
      <span
        onClick={handleShow}
        className={`inline-block pr-1 ${className} ${
          highlightable &&
          "hover:text-red-500 hover:scale-105 transition-transform duration-200 transform"
        }`}
      >
        {`${word} `}
      </span>
      {/* <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="capitalize">
            <SpokenWord size="xl" word={word} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-5 w-full">
          <div>
            <Sentence highlightable={false} sentence={coachData?.description} />
          </div>
          <div>
            <Sentence
              highlightable={false}
              sentence={coachData?.example_sentence}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {coachData?.similar_sounds?.split(",").map((word, id) => (
              <SpokenWord key={id} word={word} />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default IndividualWord;
