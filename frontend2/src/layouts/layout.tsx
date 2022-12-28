import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

const useP = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 425) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  return { isMobile, setIsMobile };
};

const Layout = () => {
  const { isMobile } = useP();

  console.log(isMobile);
  return (
    <main className="flex min-h-screen">
      <Sidebar isMobile={isMobile} />

      <section className="flex-1 bg-red-100"></section>
    </main>
  );
};

export default Layout;
