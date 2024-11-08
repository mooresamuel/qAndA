import HamburgerSVG from "../HamburgerSVG/HamburgerSVG";
import LogoSVG from "../LogoSVG/LogoSVG";

function NavigationBar() {
  return (
    <div className="bg-hightlight h-16 flex justify-between items-center px-4">
      <LogoSVG />
      <div>
        {" "}
        <HamburgerSVG />
      </div>
    </div>
  );
}

export default NavigationBar;
