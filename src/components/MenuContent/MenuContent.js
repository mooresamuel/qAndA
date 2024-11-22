import { useEffect } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import CloseSVG from "../CloseSVG/CloseSVG";
import PersonSVG from "../PersonSVG/PersonSVG";

function MenuContent({ menuClick, className }) {
  const { setDisableText, disableText, element, setSelector } = useGlobalContext();
  const handleClick = () => {
    menuClick(false);
  };

  const handleText = (e) => {
    const checked = e.target.checked;
    if (element !== null) {
      if (checked) {
        element.current.hidden = true;
      } else {
        element.current.hidden = false;
      }
    }
  }

  useEffect(() => {
    // change this to an ID you agree on.
    // Let that ID be used for any pages that the remove text functionality is suppose to be for
    setSelector("#buttonNext"); 
  }, []);

  return (
    <div 
      style={{ backgroundColor: "#fff" }}
      className={`absolute top-0 bottom-0 left-1/4 right-0 z-50 shadow-3xl ${className}`}
    >
      <div
        className="relative h-full"
      >
        <div 
          className="w-20 h-20 cursor-pointer absolute top-0 right-0 -translate-x-2 translate-y-2"
          onClick={handleClick}
        >
          <CloseSVG className={"w-full h-full"}/>
        </div>
        
        <div className="absolute left-1/3 top-1/4">
          <div 
            className="w-20 h-20 cursor-pointer"
            onClick={handleClick}
          >
            <PersonSVG className={"w-full h-full"}/>
          </div>
          <p className="text-2xl font-bold">Hello user, {"User Name"}.</p>
        </div>

        <div className="absolute left-1/4 top-2/4 flex items-center gap-3">
          <label className="text-2xl font-bold">Disable text?: </label>
          <input
            style={{ border: '5px solid #8CB036', }}
            className="w-5 h-5" 
            type="checkbox" 
            onClick={handleText} 
          />
        </div>

      </div>
    </div>
  )
}

export default MenuContent