import { useState } from "react";
import { Clipboard } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/card";
import ClearFilterButton from "./clearFilter-button";

const options = [
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "To pay",
    value: "topay",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

const StateFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedValues, setCheckedValues] = useState(
    searchParams.get("state")?.split(",") || []
  );

  const onStateChange = (value: string) => {
    let states = checkedValues;

    if (states.includes(value)) {
      states = states.filter((state) => state !== value);
    } else {
      states = [...states, value];
    }

    searchParams.set("state", states.join(","));
    setSearchParams(searchParams);
    setCheckedValues(states);

    if (states.length === 0) {
      searchParams.delete("state");
      setSearchParams(searchParams);
    }
  };

  const onReset = () => {
    searchParams.delete("state");
    setSearchParams(searchParams);
    setCheckedValues([]);
  };

  return (
    <>
      <Card classNames="cursor-pointer justify-between md:justify-start flex items-center gap-x-6 font-semibold px-3 py-2">
        <p>Expense state</p>
        <Clipboard color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <ul className="mid-sm:w-max absolute top-12 z-10 flex h-fit w-full min-w-[167px] origin-top-left animate-fadeIn flex-col gap-2 rounded-lg bg-white p-4 shadow-lg">
          {options.map((option) => (
            <li key={option.value} className="flex items-center gap-2">
              <input
                onChange={() => onStateChange(option.value)}
                type="checkbox"
                name="state"
                value={option.value}
                checked={checkedValues.includes(option.value)}
                className="h-4 w-4 cursor-pointer rounded accent-purple-500"
              />
              <label className="inline-flex items-center">{option.label}</label>
            </li>
          ))}
          <ClearFilterButton
            disabled={checkedValues.length === 0}
            reset={onReset}
          />
        </ul>
      )}
    </>
  );
};

export default StateFilter;
