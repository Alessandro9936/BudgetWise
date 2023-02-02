import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import useCheckMobile from "../hooks/useCheckMobile";
import Sidebar from "./sidebar";

import SidebarMobile from "./sidebar-mobile";

const Layout = () => {
  const { isMobile } = useCheckMobile();

  return (
    <main className="flex min-h-screen lg:h-screen">
      {!isMobile ? (
        <Sidebar isMobile={isMobile} />
      ) : (
        <SidebarMobile isMobile={isMobile} />
      )}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Layout;
