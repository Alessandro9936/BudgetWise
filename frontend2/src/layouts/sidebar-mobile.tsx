import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "../components/Utilities/ThemeToggle";
import links from "./utils/sidebar-links";

interface ISidebarMobile {
  isMobile: boolean;
}

const SidebarMobile = ({ isMobile }: ISidebarMobile) => {
  const sidebarLinks = links(isMobile);

  const { pathname } = useLocation();
  const [selectedRoute, setActiveRoute] = useState(pathname);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  return (
    <motion.ul
      className="fixed bottom-0 right-4 left-4 z-10 mb-4 flex items-center justify-between rounded-xl bg-indigo-500 p-2 dark:bg-indigo-600"
      onMouseLeave={() => setHoveredRoute(null)}
      initial={false}
    >
      {sidebarLinks.map((link) => (
        <motion.li
          key={link.route}
          onHoverStart={() => setHoveredRoute(link.route)}
          className="relative p-2"
        >
          <NavLink
            to={link.route}
            onClick={() => setActiveRoute(link.route)}
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 font-semibold text-indigo-500 dark:text-indigo-600"
                : ""
            }
          >
            <span
              className={
                link.route === selectedRoute || link.route === hoveredRoute
                  ? "text-indigo-500 dark:text-indigo-600"
                  : "text-white"
              }
            >
              {link.icon}
            </span>
            {link.route === selectedRoute && <p>{link.name}</p>}
          </NavLink>

          {link.route === selectedRoute ? (
            <motion.div
              layoutId="selected"
              className="absolute top-0 bottom-0 left-0 right-0 -z-10 rounded-xl bg-white"
            />
          ) : null}
          {link.route === hoveredRoute ? (
            <motion.div
              layoutId="hovered"
              className="absolute top-0 bottom-0 left-0 right-0 -z-20 rounded-xl bg-indigo-100 dark:bg-indigo-200"
            />
          ) : null}
        </motion.li>
      ))}

      <div className="p-2 text-white">
        <ThemeToggle isOpen={false} />
      </div>
    </motion.ul>
  );
};

export default SidebarMobile;
