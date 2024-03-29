import { BiHomeAlt, BiPieChartAlt2, BiTransfer, BiUser } from "react-icons/bi";
import { RouteProps } from "../types/types";

const routes = (isMobile: boolean): RouteProps[] => {
  return [
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
};

export default routes;
