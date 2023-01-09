interface ITimeSpanButton {
  timeSpan: "Yearly" | "Monthly" | "Weekly";
  activeTimeSpan: "Yearly" | "Monthly" | "Weekly";
  updateActiveTimeSpan: (timeSpan: "Yearly" | "Monthly" | "Weekly") => void;
}

const TimeSpanButton = ({
  timeSpan,
  activeTimeSpan,
  updateActiveTimeSpan,
}: ITimeSpanButton) => {
  return (
    <button
      onClick={() => updateActiveTimeSpan(timeSpan)}
      className={`rounded-full px-2 py-1 text-xs font-semibold text-neutral-500 shadow transition md:px-3 md:py-1 ${
        activeTimeSpan === timeSpan ? "bg-white" : "hover:bg-white"
      }`}
    >
      {timeSpan}
    </button>
  );
};

export default TimeSpanButton;
