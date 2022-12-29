import { useState } from "react";
import { CreditCard, Database, Home, LogOut, Menu, User } from "react-feather";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isMobile }: { isMobile: boolean }) => {
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
      name: "Profile",
      route: "/profile",
      icon: <User size={isMobile ? 16 : 20} />,
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <aside className="z-10 flex max-w-max flex-1 flex-col gap-y-10 bg-white py-2 pl-6 shadow-md dark:bg-gray-700">
        {/* Header */}
        <div className="flex h-7 items-center gap-x-4 pr-6">
          <Menu
            size={isMobile ? 16 : 20}
            cursor={"pointer"}
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <Link to={"/dashboard"} className="font-semibold md:text-xl">
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
        </ul>
        <div className="mt-auto">
          <div className="flex h-8 cursor-pointer items-center gap-x-4 hover:stroke-purple-500 hover:text-purple-500">
            <LogOut size={20} />
            {isOpen && <p>Logout</p>}
          </div>
        </div>
      </aside>
      {isMobile && isOpen && (
        <div className="absolute top-0 bottom-0 left-0 right-0 -z-0 flex-1 bg-blue-600"></div>
      )}
    </>
  );
};
export default Sidebar;
