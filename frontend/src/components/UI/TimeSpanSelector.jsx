import classes from "../styles/TimeSpanSelector.module.css";

export function TimeSpanSelector({
  timeSpans,
  updateActiveTimeSpan,
  activeTimeSpan,
}) {
  return (
    <div className={classes["time-selectors"]}>
      {timeSpans.map((timeSpan) => (
        <span
          key={timeSpan}
          onClick={updateActiveTimeSpan}
          className={`${classes.selector} + ${
            activeTimeSpan === timeSpan ? classes.active : undefined
          }`}
        >
          {timeSpan}
        </span>
      ))}
    </div>
  );
}
