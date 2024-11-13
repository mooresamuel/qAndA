import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavigationBar";

function Layout() {
  return (
    <div className="h-screen overflow-y-">
      <NavigationBar />
      <div className="max-w-screen-md m-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
