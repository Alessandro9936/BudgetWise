import Card from "../../../components/Utilities/card";

import { Calendar as CalendarDep } from "react-calendar";
import "../../../styles/calendar.css";
import {
  ITransactionResponse,
  useGetTransactionsByDate,
} from "../../../services/transaction-services";
import { useState } from "react";
import { isSameDay } from "date-fns";
import { getCurrency } from "../../../context/user-context";

interface ITransactionPopup {
  coords: { top: string | undefined; left: string | undefined } | undefined;
  transactions: ITransactionResponse[];
}

const TransactionPopup = ({ coords, transactions }: ITransactionPopup) => {
  const currency = getCurrency();
  return (
    <ul
      className={`pointer-events-none absolute z-10 flex w-40 origin-top-right animate-fadeIn flex-col gap-2 rounded-xl bg-purple-500 p-2 font-semibold text-white`}
      style={{ top: coords?.top, left: coords?.left }}
    >
      {transactions.map((transaction) => (
        <li key={transaction._id}>
          <p>{transaction.description}</p>
          <p>
            Type: <span className="font-normal">{transaction.type}</span>
          </p>
          <p>
            Amount:{" "}
            <span className="font-normal">
              {transaction.amount} {currency}
            </span>
          </p>
          {transaction?.type === "expense" && (
            <p>
              Budget:{" "}
              <span className="font-normal">{transaction.budget?.name}</span>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

const Calendar = ({ gridDisposition }: { gridDisposition: string }) => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupCoords, setPopupCoords] = useState<{
    top: string | undefined;
    left: string | undefined;
  }>();
  const [transactionsPopup, setTransactionsPopup] = useState<
    ITransactionResponse[]
  >([]);

  const query = useGetTransactionsByDate(calendarDate, "Monthly");

  const transactions = query.data ?? [];

  const onPreviewHover = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    transactionsOnDate: ITransactionResponse[]
  ) => {
    setPopupCoords({
      top: e.clientY + 10 + "px",
      left: e.clientX - 150 + "px",
    });
    setTransactionsPopup(transactionsOnDate);
  };

  return (
    <section className={`${gridDisposition} flex flex-col gap-y-3`}>
      <h3 className="text-base font-semibold">Calendar</h3>
      {isPopupVisible && (
        <TransactionPopup
          coords={popupCoords}
          transactions={transactionsPopup}
        />
      )}
      <Card classNames="flex-1 py-2 px-4 animate-appear">
        <CalendarDep
          onActiveStartDateChange={({ activeStartDate }) =>
            setCalendarDate(activeStartDate)
          }
          minDetail="year"
          tileContent={({ date, view }) => {
            const transactionsOnDate = transactions.filter(
              (transaction) =>
                isSameDay(date, transaction.date) && view === "month"
            );

            return transactionsOnDate.length > 0
              ? transactionsOnDate.map((transaction) => {
                  return (
                    <span
                      key={transaction._id}
                      className={`absolute top-1 right-1 rounded-2xl p-1 ${
                        transaction.type === "income"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      onMouseOver={(e) => {
                        onPreviewHover(e, transactionsOnDate);
                        setIsPopupVisible(true);
                      }}
                      onMouseOut={() => setIsPopupVisible(false)}
                    />
                  );
                })
              : null;
          }}
        />
      </Card>
    </section>
  );
};
export default Calendar;
