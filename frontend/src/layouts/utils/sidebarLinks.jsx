import { CreditCard, Database, FileText, Home, User } from "react-feather";

const sidebarLinks = [
  {
    name: "Dashboard",
    route: "/app/dashboard",
    icon: <Home size={20} />,
  },
  {
    name: "Invoices",
    route: "/app/invoices",
    icon: <CreditCard size={20} />,
  },
  {
    name: "Budgets",
    route: "/app/budgets",
    icon: <Database size={20} />,
  },
  {
    name: "Reports",
    route: "/app/reports",
    icon: <FileText size={20} />,
  },
  {
    name: "Profile",
    route: "/app/profile",
    icon: <User size={20} />,
  },
];

export default sidebarLinks;
