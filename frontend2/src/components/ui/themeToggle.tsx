import { BiBulb, BiMoon } from "react-icons/bi";
import useCheckMobile from "../../hooks/useCheckMobile";

import { motion } from "framer-motion";
import useToggleTheme from "../../hooks/useToggleTheme";

const itemsVariants = {
  closed: { opacity: 0, width: 0, y: "-25%" },
  open: {
    opacity: 1,
    y: 0,
  },
};

const ThemeToggle = ({ isOpen }: { isOpen: boolean }) => {
  const { isMobile } = useCheckMobile();
  const { theme, handleThemeSwitch } = useToggleTheme();

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
