import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavigationBar";

function Layout() {
  return (
    <div className="overflow-y-auto flex flex-col h-screen">
      <NavigationBar />
      <div className="max-w-screen-sm m-auto flex-grow w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
