import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavigationBar";

function Layout() {
  return (
    <div className="overflow-y-auto flex flex-col h-screen">
      <NavigationBar />
      <div className="max-w-screen-md m-auto flex-grow w-full flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
