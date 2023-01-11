interface IDateBar {
  updateActiveDate: (action: "sub" | "add") => void;
  activeDateFormatted: string | number;
}

const DateBar = ({ updateActiveDate, activeDateFormatted }: IDateBar) => {
  return (
    <div className="flex items-center justify-between rounded-full bg-white font-semibold shadow">
      <span
        className="cursor-pointer rounded-l-xl bg-slate-900 px-2 py-1 text-white transition hover:bg-purple-500"
        onClick={() => updateActiveDate("sub")}
      >
        &lt;
      </span>
      <p>{activeDateFormatted}</p>
      <span
        className="cursor-pointer rounded-r-xl bg-slate-900 px-2 py-1 text-white transition hover:bg-purple-500"
        onClick={() => updateActiveDate("add")}
      >
        &gt;
      </span>
    </div>
  );
};

export default DateBar;
