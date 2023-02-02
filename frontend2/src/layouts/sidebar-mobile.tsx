import ThemeToggle from "../components/Utilities/ThemeToggle";
import LinkSidebarMobile from "./components/sidebarLinkMobile";
import useRoutes from "./hooks/useRoutes";
import routes from "./utils/sidebar-routes";

interface ISidebarMobile {
  isMobile: boolean;
}

const SidebarMobile = ({ isMobile }: ISidebarMobile) => {
  const sidebarRoutes = routes(isMobile);

  const { activeRoute, onActiveRouteChange, hoveredRoute, setHoveredRoute } =
    useRoutes();

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
            activeRoute={activeRoute}
            setActiveRoute={onActiveRouteChange}
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
