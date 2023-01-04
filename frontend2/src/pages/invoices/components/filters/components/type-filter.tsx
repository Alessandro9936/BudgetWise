import { CreditCard } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/card";
import ClearFilterButton from "./clearFilter-button";

const options = [
  {
    label: "Income",
    value: "income",
  },
  {
    label: "Expense",
    value: "expense",
  },
];

const TypeFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onTypeChange = (value: string) => {
    searchParams.set("type", value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <Card classNames="cursor-pointer flex items-center gap-x-6 font-semibold px-3 py-2">
        <p>Transaction type</p>
        <CreditCard color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <ul className="absolute top-12 flex h-fit w-[186px] origin-top-left animate-fadeIn flex-col gap-2 rounded-lg bg-white p-4 shadow-lg">
          {options.map((option) => (
            <li className="flex items-center gap-2">
              <input
                onClick={() => onTypeChange(option.value)}
                type="radio"
                name="type"
                value={option.value}
                checked={searchParams.get("type")?.includes(option.value)}
                className="h-4 w-4 cursor-pointer border-gray-300 text-purple-500 accent-purple-500"
              />
              <label>{option.label}</label>
            </li>
          ))}
          <ClearFilterButton
            disabled={!searchParams.get("type")}
            filter="type"
          />
        </ul>
      )}
    </>
  );
};

export default TypeFilter;
