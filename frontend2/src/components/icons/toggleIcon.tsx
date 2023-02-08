import { motion } from "framer-motion";
import { BiChevronRight } from "react-icons/bi";

const ToggleIcon = ({ trigger }: { trigger: boolean }) => {
  return (
    <motion.span
      animate={{ rotate: trigger ? 90 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <BiChevronRight
        size={20}
        className="cursor-pointer text-neutral-500 dark:text-neutral-400"
      />
    </motion.span>
  );
};

export default ToggleIcon;
