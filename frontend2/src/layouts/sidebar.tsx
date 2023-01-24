import {
  BiCaretLeftCircle,
  BiExit,
  BiHomeAlt,
  BiMenu,
  BiPieChartAlt2,
  BiTransfer,
  BiUser,
  BiX,
} from "react-icons/bi";

import { motion } from "framer-motion";

import { NavLink } from "react-router-dom";
import Logo from "../components/UI/logo";
import ThemeToggle from "../components/Utilities/ThemeToggle";
import { useLogoutUser } from "../services/user/user-services";

const sidebarVariants = {
  closed: { width: "fit-content", transition: { type: "tween" } },
  open: {
    width: 250,
    transition: {
      type: "tween",
      duration: 0.15,
      staggerChildren: 0.15,
    },
  },
};

const itemsVariants = {
  closed: { opacity: 0, width: 0, y: "-25%" },
  open: {
    opacity: 1,
    y: 0,
  },
};

interface ISidebar {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isMobile, isOpen, setIsOpen }: ISidebar) => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <BiHomeAlt size={isMobile ? 20 : 24} />,
    },
    {
      name: "Invoices",
      route: "/invoices",
      icon: <BiTransfer size={isMobile ? 20 : 24} />,
    },
    {
      name: "Budgets",
      route: "/budgets",
      icon: <BiPieChartAlt2 size={isMobile ? 20 : 24} />,
    },

    {
      name: "Profile",
      route: "/profile",
      icon: <BiUser size={isMobile ? 20 : 24} />,
    },
  ];

  const { logoutUser } = useLogoutUser();

  return (
    <aside className="sticky top-0 z-20 flex h-screen max-w-fit flex-1 flex-col gap-y-10 bg-white py-6 pl-4 shadow-md dark:bg-gray-800">
      <div className="flex h-7 items-center gap-x-4 pl-2 pr-4 md:pr-6">
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
          <motion.span
            variants={itemsVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <Logo redirect="/dashboard" />
          </motion.span>
        )}
      </div>

      <motion.ul
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="flex flex-1 flex-col gap-y-8"
      >
        {sidebarLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.route}
              className={({ isActive }) =>
                isActive
                  ? "mr-4 flex items-center rounded-lg bg-indigo-500 p-2 font-semibold text-white transition dark:bg-indigo-600"
                  : "mr-4 flex items-center rounded-lg p-2 focus:text-indigo-500 hover:text-indigo-500 hover:transition"
              }
            >
              {link.icon}
              {isOpen && (
                <motion.p className="ml-4" variants={itemsVariants}>
                  {link.name}
                </motion.p>
              )}
            </NavLink>
          </li>
        ))}
        <ThemeToggle />
        <li
          className="mr-4 flex cursor-pointer items-end  pl-2 hover:stroke-indigo-500 hover:text-indigo-500 hover:transition md:mt-auto"
          onClick={() => logoutUser()}
        >
          <BiExit size={isMobile ? 20 : 24} className="rotate-180" />
          {isOpen && (
            <motion.p className="ml-4" variants={itemsVariants}>
              Logout
            </motion.p>
          )}
        </li>
      </motion.ul>
    </aside>
  );
};
export default Sidebar;
