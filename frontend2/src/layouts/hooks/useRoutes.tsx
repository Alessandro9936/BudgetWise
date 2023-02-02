import { useState } from "react";
import { useLocation } from "react-router-dom";

const useRoutes = () => {
  const { pathname } = useLocation();
  const [activeRoute, setActiveRoute] = useState(pathname);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const onActiveRouteChange = (route: string) => {
    if (route === activeRoute) return;
    setActiveRoute(route);
  };
  return { activeRoute, onActiveRouteChange, hoveredRoute, setHoveredRoute };
};

export default useRoutes;
