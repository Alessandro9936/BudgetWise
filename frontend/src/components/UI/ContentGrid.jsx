import classes from "../styles/ContentGrid.module.css";

export function ContentGrid({ children, gridAreas = "" }) {
  return (
    <section className={`${classes["content-grid"]} ${gridAreas}`}>
      {children}
    </section>
  );
}
