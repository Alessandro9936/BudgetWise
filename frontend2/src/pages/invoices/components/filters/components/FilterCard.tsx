import { MouseEvent, ReactNode } from "react";

interface IFilterCard {
  filterName: "type" | "date" | "sort" | "state" | "budget";
  setActiveDropdown: React.Dispatch<
    React.SetStateAction<"type" | "date" | "sort" | "state" | "budget" | null>
  >;
  hasParams: boolean;
  children: ReactNode;
}

const FilterCard = ({
  filterName,
  setActiveDropdown,
  hasParams,
  children,
}: IFilterCard) => {
  const handleActiveDropdownChange = (event: MouseEvent) => {
    setActiveDropdown((prev) => (prev === filterName ? null : filterName));
    event.stopPropagation();
  };
  return (
    <div
      onClick={(event) => handleActiveDropdownChange(event)}
      className={`relative flex cursor-pointer items-center justify-between gap-x-6 rounded-xl bg-white px-3 py-2 font-semibold shadow dark:bg-slate-800 md:justify-start ${
        hasParams ? "text-indigo-500 ring ring-inset ring-indigo-500" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default FilterCard;
