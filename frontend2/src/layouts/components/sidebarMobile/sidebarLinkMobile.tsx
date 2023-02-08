import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { LinkSidebarProps } from "../../types/types";

const LinkSidebarMobile = ({
  link,
  hoveredRoute,
  setHoveredRoute,
}: LinkSidebarProps) => {
  const { pathname } = useLocation();
  return (
    <motion.li
      key={link.route}
      onHoverStart={() => setHoveredRoute(link.route)}
      className="relative z-20"
    >
      <NavLink
        to={link.route}
        className={({ isActive }) =>
          isActive
            ? "flex gap-2 p-2 font-semibold text-indigo-500 dark:text-indigo-600 "
            : "flex p-2"
        }
      >
        <span
          className={
            link.route === pathname || link.route === hoveredRoute
              ? "text-indigo-500 dark:text-indigo-600"
              : "text-white"
          }
        >
          {link.icon}
        </span>
        {link.route === pathname && <p>{link.name}</p>}
      </NavLink>

      {link.route === pathname ? (
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
  );
};

export default LinkSidebarMobile;
