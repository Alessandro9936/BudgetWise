import { useState } from "react";
import {
  Bell,
  CreditCard,
  Database,
  Home,
  LogOut,
  Menu,
  User,
  X,
} from "react-feather";
import { Link, NavLink } from "react-router-dom";

interface ISidebar {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isMobile, isOpen, setIsOpen }: ISidebar) => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <Home size={isMobile ? 16 : 20} />,
    },
    {
      name: "Invoices",
      route: "/invoices",
      icon: <CreditCard size={isMobile ? 16 : 20} />,
    },
    {
      name: "Budgets",
      route: "/budgets",
      icon: <Database size={isMobile ? 16 : 20} />,
    },

    {
      name: "Notifications",
      route: "/profile",
      icon: <Bell size={isMobile ? 16 : 20} />,
    },
  ];

  return (
    <>
      <aside className="relative z-20 flex h-screen max-w-fit flex-1 flex-col gap-y-10 bg-white py-6 pl-4 shadow-md  dark:bg-gray-700 md:pl-6">
        {/* Header */}
        <div className="flex h-7 items-center gap-x-4 pr-4 md:pr-6">
          {!isOpen ? (
            <Menu
              size={isMobile ? 16 : 20}
              cursor={"pointer"}
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <X
              size={isMobile ? 16 : 20}
              cursor={"pointer"}
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          {isOpen && (
            <Link to={"/dashboard"} className="text-xl font-semibold">
              Budget<span className="text-purple-500">Wise</span>
            </Link>
          )}
        </div>

        {/* Links */}
        <ul className="flex flex-1 flex-col gap-y-8">
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.route}
                className={({ isActive }) =>
                  isActive
                    ? `flex h-8 items-center gap-x-4  ${
                        isOpen
                          ? "border-r-2 border-purple-500 bg-gradient-to-l from-purple-200"
                          : ""
                      }  font-semibold text-purple-500`
                    : "flex h-8 items-center gap-x-4  hover:stroke-purple-500 hover:text-purple-500"
                }
              >
                {link.icon}
                {isOpen && <p>{link.name}</p>}
              </NavLink>
            </li>
          ))}
          <div className="md:mt-auto">
            <div className="flex h-8 cursor-pointer items-center gap-x-4 hover:stroke-purple-500 hover:text-purple-500">
              <LogOut size={isMobile ? 16 : 20} />
              {isOpen && <p>Logout</p>}
            </div>
          </div>
        </ul>
      </aside>
    </>
  );
};
export default Sidebar;
