import { Link } from "react-router-dom";
import HamburgerSVG from "../HamburgerSVG/HamburgerSVG";
import LogoSVG from "../LogoSVG/LogoSVG";

function NavigationBar() {
  return (
    <div className="flex-shrink-0 bg-hightlight h-16 flex justify-between items-center px-4">
      <Link to={""}>
        <LogoSVG />
      </Link>
      <div>
        {" "}
        <HamburgerSVG />
      </div>
    </div>
  );
}

export default NavigationBar;
