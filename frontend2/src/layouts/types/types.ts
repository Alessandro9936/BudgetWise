export type RouteProps = {
  name: "Dashboard" | "Invoices" | "Budgets" | "Profile";
  route: string;
  icon: JSX.Element;
};

export type LinkSidebarProps = {
  link: RouteProps;
  isOpen?: boolean;
  hoveredRoute: string | null;
  setHoveredRoute: React.Dispatch<React.SetStateAction<string | null>>;
};
