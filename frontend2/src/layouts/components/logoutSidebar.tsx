import { itemsVariants } from "../utils/variants";

import { motion } from "framer-motion";
import { useLogoutUser } from "@/services/user-services";
import { BiExit } from "react-icons/bi";

type LogoutSidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
};

const LogoutSidebar = ({ isOpen, isMobile }: LogoutSidebarProps) => {
  const { logoutUser } = useLogoutUser();

  return (
    <li
      className="mr-4 mt-auto flex cursor-pointer pl-2 hover:stroke-indigo-500 hover:text-indigo-500 hover:transition "
      onClick={() => logoutUser()}
    >
      <span>
        <BiExit size={isMobile ? 20 : 24} className="rotate-180" />
      </span>

      {isOpen && (
        <motion.span className="ml-4" variants={itemsVariants}>
          Logout
        </motion.span>
      )}
    </li>
  );
};

export default LogoutSidebar;
