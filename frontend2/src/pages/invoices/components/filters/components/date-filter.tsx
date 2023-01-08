import { useState } from "react";
import { Calendar } from "react-calendar";
import { Clock } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/card";
import ClearFilterButton from "./clearFilter-button";

const DateFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedValues, setCheckedValues] = useState(
    searchParams.get("range")?.split(",") || []
  );

  const onRangeChange = (dates: Date[]) => {
    const formattedDates = dates.map((date) =>
      date.toLocaleDateString(navigator.language, {
        month: "long",
        year: "numeric",
      })
    );

    if (formattedDates[0] === formattedDates[1]) {
      searchParams.set("range", formattedDates[0]);
    } else {
      searchParams.set("range", formattedDates.join(","));
    }

    setCheckedValues(formattedDates);
    setSearchParams(searchParams);
  };

  const onReset = () => {
    searchParams.delete("range");
    setSearchParams(searchParams);
    setCheckedValues([]);
  };

  return (
    <>
      <Card classNames="cursor-pointer justify-between md:justify-start flex items-center gap-x-6 font-semibold px-3 py-2">
        <p>Select dates</p>
        <Clock color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <div className="absolute top-12 z-10 h-fit w-full origin-top-left animate-fadeIn rounded-lg bg-white p-4 shadow-lg md:w-72">
          <Calendar
            minDetail="year"
            maxDetail="year"
            selectRange={true}
            allowPartialRange={true}
            onChange={onRangeChange}
            defaultValue={
              checkedValues.length > 0
                ? checkedValues.map((date) => new Date(date))
                : undefined
            }
          />
          <ClearFilterButton
            disabled={checkedValues.length === 0}
            reset={onReset}
          />
        </div>
      )}
    </>
  );
};

export default DateFilter;
