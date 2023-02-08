import { Outlet } from "react-router-dom";
import useCheckMobile from "../hooks/useCheckMobile";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebarMobile";

const Layout = () => {
  const { isMobile } = useCheckMobile();

  return (
    <main className="flex min-h-screen lg:h-screen">
      {!isMobile ? (
        <Sidebar isMobile={isMobile} />
      ) : (
        <SidebarMobile isMobile={isMobile} />
      )}
      <Outlet />
    </main>
  );
};

export default Layout;
