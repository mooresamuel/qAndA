import BlankPageSVG from "../BlankPageSVG/BlankPageSVG";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import TryAgainSVG from "../TryAgainSVG/TryAgainSVG";

function ModalElement({ onClose, text, closeLabel, className }) {
  return (
    <div
      id="modal"
      className={`absolute grid place-items-center rounded-3xl bg-blue-600 p-3 shadow-very-large w-2/3 z-50 left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 overflow-y-hidden ${className}`}
    >
      <div className="grid gap-4">
        <div
          id="modal-header"
          className="w-full flex items-center justify-center "
        >
          <div className="w-28 h-28">
            {text === "Try Again..." ? (
              <TryAgainSVG className={"w-full h-full bg-white rounded-lg"} />
            ) : (
              <BlankPageSVG className={"w-full h-full"} />
            )}
          </div>
        </div>

        <div className="modal-body">
          <NextButtonRight
            label={closeLabel}
            removeArrow={true}
            onClick={onClose}
          />
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}

export default ModalElement;
