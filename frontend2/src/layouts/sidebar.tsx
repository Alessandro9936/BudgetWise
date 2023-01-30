import { BiCaretLeftCircle, BiExit } from "react-icons/bi";

import { motion } from "framer-motion";

import { NavLink, useLocation } from "react-router-dom";
import Logo from "../components/UI/logo";
import ThemeToggle from "../components/Utilities/ThemeToggle";
import { useLogoutUser } from "../services/user/user-services";
import links from "./utils/sidebar-links";
import { useState } from "react";

const sidebarVariants = {
  closed: { width: "fit-content", transition: { type: "tween" } },
  open: {
    width: 260,
    transition: {
      type: "tween",
      duration: 0.25,
      delayChildren: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const itemsVariants = {
  closed: { opacity: 0, y: "-25%", display: "none" },
  open: {
    y: 0,
    opacity: 1,
    display: "block",
    transition: { type: "tween" },
  },
};

interface ISidebar {
  isMobile: boolean;
}

const Sidebar = ({ isMobile }: ISidebar) => {
  const [isOpen, setIsOpen] = useState(isMobile ? true : false);
  const sidebarLinks = links(isMobile);

  const { logoutUser } = useLogoutUser();

  const { pathname } = useLocation();
  const [selectedRoute, setActiveRoute] = useState(pathname);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  return (
    <aside className="sticky top-0 z-20 flex h-screen flex-col gap-y-10 bg-white py-6 pl-4 shadow-md dark:bg-gray-800">
      <motion.ul
        onMouseLeave={() => setHoveredRoute(null)}
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="flex flex-1 flex-col gap-y-8"
      >
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
            <motion.span variants={itemsVariants}>
              <Logo redirect="/dashboard" />
            </motion.span>
          )}
        </div>

        {sidebarLinks.map((link) => (
          <motion.li
            className="relative"
            key={link.route}
            onClick={() => setActiveRoute(link.route)}
            onHoverStart={() => setHoveredRoute(link.route)}
          >
            <NavLink
              to={link.route}
              className={({ isActive }) =>
                `mr-4 flex items-center rounded-lg p-2 ${
                  isActive ? "font-semibold text-white" : ""
                }`
              }
            >
              <span>{link.icon}</span>
              {isOpen && (
                <motion.p className="ml-4" variants={itemsVariants}>
                  {link.name}
                </motion.p>
              )}

              {link.route === selectedRoute ? (
                <motion.div
                  layoutId="selected"
                  className="absolute top-0 bottom-0 left-0 right-0 -z-10 mr-4 rounded-lg bg-indigo-500 dark:bg-indigo-600"
                />
              ) : null}
              {link.route === hoveredRoute ? (
                <motion.div
                  layoutId="hovered"
                  className="absolute top-0 bottom-0 left-0 right-0 -z-20 mr-4 rounded-lg bg-indigo-100 dark:bg-slate-700"
                />
              ) : null}
            </NavLink>
          </motion.li>
        ))}
        <li
          className="mr-4 mt-auto flex cursor-pointer  items-end pl-2 hover:stroke-indigo-500 hover:text-indigo-500 hover:transition "
          onClick={() => logoutUser()}
        >
          <span>
            <BiExit size={isMobile ? 20 : 24} className="block rotate-180" />
          </span>
          {isOpen && (
            <motion.p className="ml-4" variants={itemsVariants}>
              Logout
            </motion.p>
          )}
        </li>
        <ThemeToggle isOpen={isOpen} />
      </motion.ul>
    </aside>
  );
};
export default Sidebar;
