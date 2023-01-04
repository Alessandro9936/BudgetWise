import { Calendar } from "react-calendar";
import { Clock } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/card";
import ClearFilterButton from "./clearFilter-button";

const DateFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();

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

    setSearchParams(searchParams);
  };

  const activeRange = searchParams.get("range")?.split(",");

  let defaultRangeValue;
  if (activeRange?.length === 1) {
    defaultRangeValue = new Date(activeRange.toString());
  } else if (activeRange && activeRange?.length > 1) {
    defaultRangeValue = activeRange.map((date) => new Date(date));
  }

  return (
    <>
      <Card classNames="cursor-pointer flex items-center gap-x-6 font-semibold px-3 py-2">
        <p>Select dates</p>
        <Clock color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <div className="absolute top-12 h-fit w-72 origin-top-left animate-fadeIn rounded-lg bg-white p-4 shadow-lg">
          <Calendar
            minDetail="year"
            maxDetail="year"
            selectRange={true}
            allowPartialRange={true}
            onChange={onRangeChange}
            defaultValue={defaultRangeValue}
          />
          <ClearFilterButton disabled={!defaultRangeValue} filter="range" />
        </div>
      )}
    </>
  );
};

export default DateFilter;
