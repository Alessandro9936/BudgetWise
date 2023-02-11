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
import { ActionType } from "@/types/actionType";
import { TimeSpanType } from "@/types/timeSpanType";

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

const formatDateString = (timeSpan: TimeSpanType, activeDate: Date) => {
  const year = activeDate.getFullYear();
  const month = monthNames[activeDate.getMonth()];
  const week = {
    start: startOfWeek(activeDate, { weekStartsOn: 1 }),
    end: endOfWeek(activeDate, { weekStartsOn: 1 }),
  };

  const formatString = {
    Yearly: year,
    Monthly: `${month} ${year}`,
    Weekly: `${week.start.toLocaleDateString(navigator.language, {
      dateStyle: "long",
    })} - ${week.end.toLocaleDateString(navigator.language, {
      dateStyle: "long",
    })} `,
  };

  return formatString[timeSpan];
};

/*
This custom hook is used throughout the application wherever dates and their updating is needed. Dates are a fundamental piece to handle in this application because queries often use them to filter data coming from the backend.

The hook uses the useState hook from React to manage the state for the active date and active timespan.

It returns: 
- updateActiveDate: A function that can be called to update the active date based on the current time span. It takes an argument of "add" or "sub" to determine whether to add or subtract time span from the active date.

- updateActiveTimeSpan: A function that can be called to update the active time span. It takes an argument of "Yearly", "Monthly", or "Weekly" to set the active time span.

- refreshDate: A function that can be called to refresh the active date to the current date.

- activeDate: The current active date.

- activeDateFormatted: The active date formatted as a string based on the active time span.

- activeTimeSpan: The current active time span
*/
const useActiveDates = () => {
  const [activeTimeSpan, setActiveTimeSpan] = useState<TimeSpanType>("Monthly");

  const [activeDate, setActiveDate] = useState(new Date());

  const updateActiveDate = (action: ActionType) => {
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

  const updateActiveTimeSpan = (timeSpan: TimeSpanType) => {
    setActiveTimeSpan(timeSpan);
  };

  const refreshDate = () => setActiveDate(new Date());
  const activeDateFormatted = formatDateString(activeTimeSpan, activeDate);

  return {
    updateActiveDate,
    updateActiveTimeSpan,
    refreshDate,
    activeDate,
    activeDateFormatted,
    activeTimeSpan,
  };
};

export default useActiveDates;
