import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavigationBar";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="max-w-screen-md m-auto flex-grow w-full my-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
