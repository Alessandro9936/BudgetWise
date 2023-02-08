import { TimeSpanType } from "../../types/timeSpanType";

type TimeSpanButtonProps = {
  timeSpan: TimeSpanType;
  activeTimeSpan: TimeSpanType;
  updateActiveTimeSpan: (timeSpan: TimeSpanType) => void;
};

const TimeSpanButton = ({
  timeSpan,
  activeTimeSpan,
  updateActiveTimeSpan,
}: TimeSpanButtonProps) => {
  return (
    <button
      onClick={() => updateActiveTimeSpan(timeSpan)}
      className={`rounded-full px-2 py-1 text-xs font-semibold shadow hover:bg-indigo-500  hover:text-white hover:transition dark:text-stone-300 dark:hover:bg-indigo-600 dark:hover:text-white md:px-3 md:py-1 ${
        activeTimeSpan === timeSpan
          ? "bg-indigo-500 text-white dark:bg-indigo-600 dark:text-white"
          : " dark:bg-slate-800"
      }`}
    >
      {timeSpan}
    </button>
  );
};

export default TimeSpanButton;
