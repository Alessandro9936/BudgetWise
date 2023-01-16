import { useState } from "react";
import { Outlet } from "react-router-dom";
import useCheckMobile from "../hooks/useCheckMobile";
import Sidebar from "./sidebar";

const Layout = () => {
  const { isMobile } = useCheckMobile();
  const [isOpen, setIsOpen] = useState(isMobile ? true : false);

  return (
    <main
      className={`flex min-h-screen lg:h-screen ${
        isOpen && isMobile ? "h-screen overflow-hidden" : ""
      }`}
    >
      <Sidebar isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isMobile && isOpen && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex-1 bg-black/[.75]" />
      )}
      <Outlet />
    </main>
  );
};

export default Layout;
