import { useEffect, useState } from "react";

const useCheckMobile = () => {
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

  return { isMobile };
};

export default useCheckMobile;
