import { useState } from "react";
import { Calendar } from "react-calendar";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/Utilities/card";
import ClearFilterButton from "./clearFilter-button";

import { motion } from "framer-motion";
import { BiCalendar } from "react-icons/bi";

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

  console.log(checkedValues.map((date) => new Date(date)));

  return (
    <>
      <Card
        classNames={`dark:bg-slate-800 cursor-pointer justify-between md:justify-start flex items-center gap-x-6 font-semibold px-3 py-2 ${
          checkedValues.length > 0
            ? "ring ring-inset ring-indigo-500 text-indigo-500"
            : ""
        }`}
      >
        <p>Select dates</p>
        <BiCalendar size={24} />
      </Card>

      {isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
          className="absolute top-12 z-10 h-fit w-full origin-top-left rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800 md:w-72"
        >
          <Calendar
            minDetail="year"
            maxDetail="year"
            selectRange={true}
            allowPartialRange={true}
            onChange={onRangeChange}
            defaultValue={
              checkedValues.length === 1
                ? new Date(checkedValues[0])
                : checkedValues.length >= 1
                ? checkedValues.map((date) => new Date(date))
                : undefined
            }
          />
          <ClearFilterButton
            disabled={checkedValues.length === 0}
            reset={onReset}
          />
        </motion.div>
      )}
    </>
  );
};

export default DateFilter;
