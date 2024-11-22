import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import MenuContent from "../MenuContent/MenuContent";
import HamburgerSVG from "../HamburgerSVG/HamburgerSVG";
import LogoSVG from "../LogoSVG/LogoSVG";


function NavigationBar() {
  const { setSelector, element } = useGlobalContext();
  const [ menu, setMenu ] = useState(false);

  return (
    <div
      id="navigationBar"
      className="flex-shrink-0 bg-hightlight h-16 flex justify-between items-center px-4">
      <Link to={""}>
        <LogoSVG />
      </Link>
      <div>
        {" "}

        {
          !menu ?
            <HamburgerSVG onClick={() => setMenu(true)} />
          : <MenuContent menuClick={setMenu} />
        }

        
      </div>
    </div>
  );
}

export default NavigationBar;
