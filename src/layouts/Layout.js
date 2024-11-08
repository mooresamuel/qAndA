import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavigationBar";

function Layout() {
  return (
    <div>
      <NavigationBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
