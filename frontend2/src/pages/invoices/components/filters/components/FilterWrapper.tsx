import { ReactNode } from "react";

interface IFilterWrapper {
  children: ReactNode;
}

const FilterWrapper = ({ children }: IFilterWrapper) => {
  return (
    <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
      {children}
    </div>
  );
};

export default FilterWrapper;
