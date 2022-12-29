import { Outlet } from "react-router-dom";
import Card from "../components/card";
import useCheckMobile from "../hooks/useCheckMobile";
import Sidebar from "./sidebar";

const Layout = () => {
  const { isMobile } = useCheckMobile();

  return (
    <main className="flex min-h-screen">
      <Sidebar isMobile={isMobile} />
      <Outlet />
    </main>
  );
};

export default Layout;
