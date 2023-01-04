import { AlignLeft } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/card";
import ClearFilterButton from "./clearFilter-button";

const dateOptions = [
  {
    label: "Oldest to newest",
    value: "date",
  },
  {
    label: "Newest to oldest",
    value: "-date",
  },
];
const amountOptions = [
  {
    label: "Smallest to largest",
    value: "amount",
  },
  {
    label: "Largest to smallest",
    value: "-amount",
  },
];

const SortFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSortChange = (value: string) => {
    let sort = searchParams.get("sort")?.split(",") ?? [];

    const values = {
      date: sort.find((field) => field.includes("date")) ?? "",
      amount: sort.find((field) => field.includes("amount")) ?? "",
    };

    if (value.includes("date")) {
      values.date = value;
    } else if (value.includes("amount")) {
      values.amount = value;
    }

    searchParams.set("sort", [values.date, values.amount].join(","));
    setSearchParams(searchParams);
  };

  return (
    <>
      <Card classNames="cursor-pointer flex items-center gap-x-6 font-semibold px-3 py-2">
        <p>Sort</p>
        <AlignLeft color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <div className="absolute top-12 h-fit w-max origin-top-left animate-fadeIn rounded-lg bg-white p-4  shadow-lg">
          <div className="flex flex-col gap-2 border-b border-gray-300 pb-2">
            <p>Date</p>
            <div>
              {dateOptions.map((option) => (
                <div className="mb-2 flex items-center gap-2">
                  <input
                    onClick={() => onSortChange(option.value)}
                    type="radio"
                    name="date"
                    value={option.value}
                    checked={searchParams
                      .get("sort")
                      ?.split(",")
                      .includes(option.value)}
                    className="h-4 w-4 cursor-pointer border-gray-300 text-purple-500 accent-purple-500"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <p>Amount</p>
            <div>
              {amountOptions.map((option) => (
                <div className="mb-2 flex items-center gap-2">
                  <input
                    onClick={() => onSortChange(option.value)}
                    type="radio"
                    name="amount"
                    value={option.value}
                    checked={searchParams
                      .get("sort")
                      ?.split(",")
                      .includes(option.value)}
                    className="h-4 w-4 cursor-pointer border-gray-300 text-purple-500 accent-purple-500"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
          <ClearFilterButton
            disabled={!searchParams.get("sort")}
            filter="sort"
          />
        </div>
      )}
    </>
  );
};

export default SortFilter;
