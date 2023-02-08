import { useState } from "react";
import ThemeToggle from "../components/ui/themeToggle";
import LinkSidebarMobile from "./components/sidebarMobile/sidebarLinkMobile";
import routes from "./utils/sidebar-routes";

const SidebarMobile = ({ isMobile }: { isMobile: boolean }) => {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const sidebarRoutes = routes(isMobile);

  return (
    <nav className="fixed bottom-0 right-4 left-4 z-10 mb-4">
      <ul
        className="flex w-full items-center justify-between rounded-xl bg-indigo-500 p-2 dark:bg-indigo-600"
        onMouseLeave={() => setHoveredRoute(null)}
      >
        {sidebarRoutes.map((link) => (
          <LinkSidebarMobile
            key={link.route}
            link={link}
            hoveredRoute={hoveredRoute}
            setHoveredRoute={setHoveredRoute}
          />
        ))}

        <div className="p-2 text-white">
          <ThemeToggle isOpen={false} />
        </div>
      </ul>
    </nav>
  );
};

export default SidebarMobile;
