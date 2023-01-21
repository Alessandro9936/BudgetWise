import { ChevronLeft, ChevronRight } from "react-feather";

interface IDateBar {
  updateActiveDate: (action: "sub" | "add") => void;
  activeDateFormatted: string | number;
}

const DateBar = ({ updateActiveDate, activeDateFormatted }: IDateBar) => {
  return (
    <div className=" flex items-center justify-between rounded-full bg-white py-1 px-[6px] text-sm font-semibold shadow dark:bg-slate-800">
      <span
        className="cursor-pointer rounded-full bg-slate-700 p-1 text-white transition hover:bg-indigo-500"
        onClick={() => updateActiveDate("sub")}
      >
        <ChevronLeft size={16} strokeWidth={2.5} className="stroke-white" />
      </span>
      <p>{activeDateFormatted}</p>
      <span
        className="cursor-pointer rounded-full bg-slate-700 p-1 text-white transition hover:bg-indigo-500"
        onClick={() => updateActiveDate("add")}
      >
        <ChevronRight size={16} strokeWidth={2.5} className="stroke-white" />
      </span>
    </div>
  );
};

export default DateBar;
