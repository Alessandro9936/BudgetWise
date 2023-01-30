import { BiHomeAlt, BiPieChartAlt2, BiTransfer, BiUser } from "react-icons/bi";

interface ILinkResponse {
  name: "Dashboard" | "Invoices" | "Budgets" | "Profile";
  route: string;
  icon: JSX.Element;
}

const links = (isMobile: boolean): ILinkResponse[] => {
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

export default links;
