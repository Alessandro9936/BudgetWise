import { Calendar } from "react-calendar";
import { useSearchParams } from "react-router-dom";
import ClearFilterButton from "./components/ClearFilter";

import { AnimatePresence, motion } from "framer-motion";
import { BiCalendar } from "react-icons/bi";
import FilterWrapper from "./components/FilterWrapper";
import FilterCard from "./components/FilterCard";
import { IFilter } from "./types/types";
import { filterCardVariants } from "./utils/variants";
import { formatMonth } from "../../../../services/format/date";
import useContextParams from "./hooks/useContextParams";
import useOutsideClick from "../../../../hooks/useOnClickOutside";
import { useCallback } from "react";

const DateFilter = ({ isOpen, setActiveDropdown }: IFilter) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeDates = searchParams.get("range")?.split(",") || [];

  useContextParams({ paramName: "range", activeValues: activeDates });

  const onRangeChange = (dates: Date[]) => {
    const formattedDates = dates.map((date) => formatMonth(date));

    if (formattedDates[0] === formattedDates[1]) {
      searchParams.set("range", formattedDates[0]);
    } else {
      searchParams.set("range", formattedDates.join(","));
    }

    setSearchParams(searchParams);
  };

  const onReset = () => {
    searchParams.delete("range");
    setSearchParams(searchParams);
  };

  const ref = useOutsideClick<HTMLDivElement>(
    useCallback(() => setActiveDropdown(null), [])
  );

  return (
    <FilterWrapper>
      <FilterCard
        filterName="date"
        setActiveDropdown={setActiveDropdown}
        hasParams={!!searchParams.get("range")}
      >
        <p>Select dates</p>
        <BiCalendar size={24} />
      </FilterCard>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            variants={filterCardVariants}
            initial="initial"
            animate="ending"
            exit="exit"
            className="absolute top-12 z-10 h-fit w-full origin-top-left rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800 md:w-72"
          >
            <Calendar
              minDetail="year"
              maxDetail="year"
              // With selectRange user can select two dates forming a range instead of just one. This feature return array with two dates regardless of returnValue setting. ex. [January - March] -> Return ransactions from January to March included.
              selectRange={true}
              // allowPartialRange whether to call onChange with only partial result given selectRange prop. Since selectRange expect two dates before being called this property allows to call onChange even if only one date is specified. ex. [January] -> Return ransactions of January
              allowPartialRange={true}
              onChange={onRangeChange}
              defaultValue={
                activeDates.length === 1
                  ? new Date(activeDates[0])
                  : activeDates.length >= 1
                  ? activeDates.map((date) => new Date(date))
                  : undefined
              }
            />
            <ClearFilterButton
              disabled={activeDates.length === 0}
              reset={onReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default DateFilter;
