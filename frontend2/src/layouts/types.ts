export interface IRoute {
  name: "Dashboard" | "Invoices" | "Budgets" | "Profile";
  route: string;
  icon: JSX.Element;
}

export interface ILinkSidebar {
  link: IRoute;
  isOpen?: boolean;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  hoveredRoute: string | null;
  setHoveredRoute: React.Dispatch<React.SetStateAction<string | null>>;
}
