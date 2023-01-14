import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCloseModal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.code === "Escape") navigate(-1);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
};
