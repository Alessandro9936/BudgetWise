import { Database } from "react-feather";
import Card from "../../../../../components/card";

const BudgetFilter = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      <Card classNames="cursor-pointer justify-between md:justify-start flex items-center gap-x-6 font-semibold px-3 py-2">
        <p>Expense budget</p>
        <Database color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <div className="absolute top-12 z-10 h-fit w-full origin-top-left animate-fadeIn rounded-lg bg-white p-4 shadow-lg"></div>
      )}
    </>
  );
};

export default BudgetFilter;
