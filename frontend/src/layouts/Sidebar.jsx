import classes from "./styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import sidebarLinks from "./utils/sidebarLinks";

export default function Sidebar() {
  const activeLink = (isActive) => {
    if (isActive) return classes["active-link"];
    return classes.link;
  };

  return (
    <aside className={classes["aside-container"]}>
      <p className={classes["logo-text"]}>
        Budget<span style={{ color: "var(--secondary)" }}>Wise</span>
      </p>

      <nav>
        <ul className={classes["navlink-list"]}>
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.route}
                className={({ isActive }) => activeLink(isActive)}
              >
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
