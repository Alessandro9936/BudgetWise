import { motion } from "framer-motion";
import { BiCaretLeftCircle } from "react-icons/bi";
import Logo from "../../../components/links/logo";
import { itemsVariants } from "../../utils/variants";

type SidebarHeaderProps = {
  isOpen: boolean;
  isMobile: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarHeader = ({ isOpen, isMobile, setIsOpen }: SidebarHeaderProps) => {
  return (
    <div className="mb-4 flex h-7 items-center gap-x-4 pl-2 pr-4 md:pr-6">
      <motion.div
        variants={{
          open: { rotate: 180 },
          closed: { rotate: 0 },
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
      >
        <BiCaretLeftCircle
          size={isMobile ? 20 : 24}
          cursor={"pointer"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </motion.div>

      {isOpen && (
        <motion.div variants={itemsVariants}>
          <Logo redirect="/dashboard" />
        </motion.div>
      )}
    </div>
  );
};

export default SidebarHeader;
