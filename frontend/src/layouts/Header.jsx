import { Bell } from "react-feather";
import classes from "./styles/Header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes["header__logged-user"]}>
        <Bell />
        <div className={classes["user-image"]}></div>
      </div>
    </header>
  );
}
