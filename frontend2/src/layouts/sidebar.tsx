import { BiCaretLeftCircle, BiExit } from "react-icons/bi";

import { motion } from "framer-motion";

import { useLocation } from "react-router-dom";
import Logo from "../components/UI/logo";
import ThemeToggle from "../components/Utilities/ThemeToggle";
import { useLogoutUser } from "../services/user/user-services";
import routes from "./utils/sidebar-routes";
import { useState } from "react";
import LinkSidebar from "./components/sidebarLink";
import { itemsVariants, sidebarVariants } from "./utils/variants";
import useRoutes from "./hooks/useRoutes";

interface ISidebar {
  isMobile: boolean;
}

const Sidebar = ({ isMobile }: ISidebar) => {
  const [isOpen, setIsOpen] = useState(isMobile ? true : false);
  const sidebarRoutes = routes(isMobile);

  const { logoutUser } = useLogoutUser();

  const { activeRoute, onActiveRouteChange, hoveredRoute, setHoveredRoute } =
    useRoutes();

  return (
    <nav className="sticky top-0 z-20 flex h-screen flex-col gap-y-10 bg-white py-6 pl-4 shadow-md dark:bg-slate-800">
      <motion.ul
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
            <motion.div variants={itemsVariants}>
              <Logo redirect="/dashboard" />
            </motion.div>
          )}
        </div>

        {sidebarRoutes.map((link) => (
          <LinkSidebar
            key={link.route}
            link={link}
            isOpen={isOpen}
            activeRoute={activeRoute}
            setActiveRoute={onActiveRouteChange}
            hoveredRoute={hoveredRoute}
            setHoveredRoute={setHoveredRoute}
          />
        ))}
        <li
          className="mr-4 mt-auto flex cursor-pointer pl-2 hover:stroke-indigo-500 hover:text-indigo-500 hover:transition "
          onClick={() => logoutUser()}
        >
          <span>
            <BiExit size={isMobile ? 20 : 24} className="rotate-180" />
          </span>

          {isOpen && (
            <motion.p className="ml-4" variants={itemsVariants}>
              Logout
            </motion.p>
          )}
        </li>
        <ThemeToggle isOpen={isOpen} />
      </motion.ul>
    </nav>
  );
};
export default Sidebar;
