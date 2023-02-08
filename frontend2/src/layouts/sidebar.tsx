import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../components/ui/themeToggle";
import routes from "./utils/sidebar-routes";
import { useState } from "react";
import LinkSidebar from "./components/sidebar/sidebarLink";
import { sidebarVariants } from "./utils/variants";
import LogoutSidebar from "./components/sidebar/logoutSidebar";
import SidebarHeader from "./components/sidebar/sidebarHeader";

const Sidebar = ({ isMobile }: { isMobile: boolean }) => {
  const [isOpen, setIsOpen] = useState(isMobile ? true : false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const sidebarRoutes = routes(isMobile);

  return (
    <nav className="sticky top-0 z-20 flex h-screen flex-col gap-y-10 bg-white py-6 pl-4 shadow-md dark:bg-slate-800">
      <AnimatePresence>
        <motion.ul
          variants={sidebarVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="flex flex-1 flex-col gap-y-8"
        >
          <SidebarHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isMobile={isMobile}
          />

          {sidebarRoutes.map((link) => (
            <LinkSidebar
              key={link.route}
              link={link}
              isOpen={isOpen}
              hoveredRoute={hoveredRoute}
              setHoveredRoute={setHoveredRoute}
            />
          ))}

          <LogoutSidebar isMobile={isMobile} isOpen={isOpen} />

          <ThemeToggle isOpen={isOpen} />
        </motion.ul>
      </AnimatePresence>
    </nav>
  );
};

export default Sidebar;
