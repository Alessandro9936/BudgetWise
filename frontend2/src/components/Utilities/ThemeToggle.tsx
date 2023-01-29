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
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const { isMobile } = useCheckMobile();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(
    () =>
      theme === "dark"
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark"),
    [theme]
  );

  const handleThemeSwitch = () =>
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));

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
