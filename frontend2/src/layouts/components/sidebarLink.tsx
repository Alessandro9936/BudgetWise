import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ILinkSidebar } from "../types";
import { itemsVariants } from "../utils/variants";

const LinkSidebar = ({
  link,
  isOpen,
  activeRoute,
  setActiveRoute,
  hoveredRoute,
  setHoveredRoute,
}: ILinkSidebar) => {
  return (
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

        {link.route === activeRoute ? (
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
  );
};

export default LinkSidebar;
