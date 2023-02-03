import { useEffect, useState } from "react";
import { BiBulb, BiMoon } from "react-icons/bi";
import useCheckMobile from "../../hooks/useCheckMobile";

import { motion } from "framer-motion";

const itemsVariants = {
  closed: { opacity: 0, width: 0, y: "-25%" },
  open: {
    opacity: 1,
    y: 0,
  },
};

interface IThemeToggle {
  isOpen: boolean;
}

const ThemeToggle = ({ isOpen }: IThemeToggle) => {
  const { isMobile } = useCheckMobile();

  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme as "dark" | "light";
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  };
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme());

  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return isOpen ? (
    <div
      className="dark:hover::text-indigo-600 ml-2 flex cursor-pointer items-center gap-4 hover:text-indigo-500 hover:transition"
      onClick={handleThemeSwitch}
    >
      {theme === "light" ? (
        <BiBulb size={isMobile ? 20 : 24} />
      ) : (
        <BiMoon size={isMobile ? 20 : 24} />
      )}
      <motion.p className="flex-1" variants={itemsVariants}>
        Toggle
      </motion.p>
    </div>
  ) : theme === "light" ? (
    <BiBulb
      size={isMobile ? 20 : 24}
      className="ml-2 cursor-pointer"
      onClick={handleThemeSwitch}
    />
  ) : (
    <BiMoon
      size={isMobile ? 20 : 24}
      className="ml-2 cursor-pointer"
      onClick={handleThemeSwitch}
    />
  );
};

export default ThemeToggle;
