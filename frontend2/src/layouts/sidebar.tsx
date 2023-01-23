import {
  BiExit,
  BiHomeAlt,
  BiMenu,
  BiPieChartAlt2,
  BiTransfer,
  BiUser,
  BiX,
} from "react-icons/bi";

import { AnimatePresence, motion } from "framer-motion";

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
      duration: 0.25,
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
    <AnimatePresence>
      <aside className="sticky top-0 z-20 flex h-screen max-w-fit flex-1 flex-col gap-y-10 bg-white py-6 pl-4 shadow-md dark:bg-gray-800">
        {/* Header */}
        <div className="flex h-7 items-center gap-x-4 pl-2 pr-4 md:pr-6">
          {!isOpen ? (
            <BiMenu
              size={isMobile ? 20 : 24}
              cursor={"pointer"}
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <BiX
              size={isMobile ? 20 : 24}
              cursor={"pointer"}
              onClick={() => setIsOpen(!isOpen)}
            />
          )}

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

        {/* Links */}
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
                    ? "mr-4 flex items-center gap-x-4 rounded-lg bg-indigo-500 p-2 font-semibold text-white transition dark:bg-indigo-600"
                    : "mr-4 flex items-center gap-x-4 rounded-lg p-2 hover:text-indigo-500 hover:transition"
                }
              >
                {link.icon}
                {isOpen && (
                  <motion.p variants={itemsVariants}>{link.name}</motion.p>
                )}
              </NavLink>
            </li>
          ))}

          <div className="flex flex-col gap-y-4 md:mt-auto">
            <li
              className="mr-4 flex cursor-pointer items-end gap-x-4 pl-2 hover:stroke-indigo-500 hover:text-indigo-500 hover:transition"
              onClick={() => logoutUser()}
            >
              <BiExit size={isMobile ? 20 : 24} className="rotate-180" />
              {isOpen && (
                <motion.p variants={itemsVariants} exit="closed">
                  Logout
                </motion.p>
              )}
            </li>
          </div>
        </motion.ul>
      </aside>
    </AnimatePresence>
  );
};
export default Sidebar;
