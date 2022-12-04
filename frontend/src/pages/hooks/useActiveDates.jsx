import {
  addMonths,
  addWeeks,
  addYears,
  endOfWeek,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { useState } from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDateString = (timeSpan, activeDate) => {
  const year = activeDate.getFullYear();
  const month = monthNames[activeDate.getMonth()];
  const week = {
    start: startOfWeek(activeDate, { weekStartsOn: 1 }),
    end: endOfWeek(activeDate, { weekStartsOn: 1 }),
  };

  const formatString = {
    Yearly: year,
    Monthly: `${month} ${year}`,
    Weekly: `${week.start.toLocaleDateString("en-GB", {
      dateStyle: "long",
    })} - ${week.end.toLocaleDateString("en-GB", {
      dateStyle: "long",
    })} `,
  };

  return formatString[timeSpan];
};

export function useActiveDates() {
  const [activeTimeSpan, setActiveTimeSpan] = useState("Yearly");
  const [activeDate, setActiveDate] = useState(new Date());

  const updateActiveDate = (action) => {
    switch (activeTimeSpan) {
      case "Yearly":
        {
          setActiveDate((prev) =>
            action === "add"
              ? addYears(startOfYear(prev), 1)
              : subYears(startOfYear(prev), 1)
          );
        }
        break;
      case "Monthly":
        {
          setActiveDate((prev) =>
            action === "add" ? addMonths(prev, 1) : subMonths(prev, 1)
          );
        }
        break;
      case "Weekly": {
        setActiveDate((prev) =>
          action === "add"
            ? addWeeks(startOfWeek(prev, { weekStartsOn: 1 }), 1)
            : subWeeks(startOfWeek(prev, { weekStartsOn: 1 }), 1)
        );
      }
    }
  };

  const updateActiveTimeSpan = (e) => {
    setActiveTimeSpan(e.target.textContent);
  };

  const refreshDate = () => {
    setActiveDate(new Date());
  };

  const activeDateFormatted = formatDateString(activeTimeSpan, activeDate);

  return {
    updateActiveDate,
    updateActiveTimeSpan,
    refreshDate,
    activeDate,
    activeDateFormatted,
    activeTimeSpan,
  };
}
