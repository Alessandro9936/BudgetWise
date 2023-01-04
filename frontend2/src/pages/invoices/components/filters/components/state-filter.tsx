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

  const onStateChange = (value: string) => {
    let states = searchParams.get("state")?.split(",") ?? [];

    if (states.includes(value)) {
      states = states.filter((state) => state !== value);
    } else {
      states = [...states, value];
    }

    searchParams.set("state", states.join(","));
    setSearchParams(searchParams);
  };

  return (
    <>
      <Card classNames="cursor-pointer flex items-center gap-x-6 font-semibold px-3 py-2">
        <p>Expense state</p>
        <Clipboard color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <ul className="absolute top-12 flex h-fit w-max min-w-[167px] origin-top-left animate-fadeIn flex-col gap-2 rounded-lg bg-white p-4 shadow-lg">
          {options.map((option) => (
            <li className="flex items-center gap-2">
              <input
                onClick={() => onStateChange(option.value)}
                type="checkbox"
                value={option.value}
                checked={searchParams
                  .get("state")
                  ?.split(",")
                  .includes(option.value)}
                className="h-4 w-4 cursor-pointer rounded accent-purple-500"
              />
              <label className="inline-flex items-center">{option.label}</label>
            </li>
          ))}
          <ClearFilterButton
            disabled={!searchParams.get("state")}
            filter="state"
          />
        </ul>
      )}
    </>
  );
};

export default StateFilter;
