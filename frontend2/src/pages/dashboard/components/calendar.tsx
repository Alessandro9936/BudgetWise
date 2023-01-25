import Card from "../../../components/Utilities/card";

import { Calendar as CalendarDep } from "react-calendar";
import "../../../styles/calendar.css";
import {
  ITransactionResponse,
  useGetTransactionsByDate,
} from "../../../services/transaction-services";
import { useState } from "react";
import { getCurrency } from "../../../context/user-context";

import { AnimatePresence, EventInfo, motion } from "framer-motion";

interface ITransactionPopup {
  coords: { top: string; left: string };
  transactions: ITransactionResponse[];
}

const TransactionPopup = ({ coords, transactions }: ITransactionPopup) => {
  const currency = getCurrency();
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
        className={`pointer-events-none absolute z-10 flex w-44 origin-top-right flex-col gap-y-3 rounded-xl bg-indigo-500 p-2 px-3 font-semibold text-white`}
        style={{ top: coords?.top, left: coords?.left }}
      >
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <p>{transaction.description}</p>
            <p className="text-sm">
              Type: <span className="font-normal">{transaction.type}</span>
            </p>
            <p className="text-sm">
              Amount:{" "}
              <span className="font-normal">
                {transaction.amount} {currency}
              </span>
            </p>
            {transaction?.type === "expense" && (
              <p className="text-sm">
                Budget:{" "}
                <span className="font-normal">{transaction.budget?.name}</span>
              </p>
            )}
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

const Calendar = ({ gridDisposition }: { gridDisposition: string }) => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupCoords, setPopupCoords] = useState<{
    top: string;
    left: string;
  }>();

  const [transactionsPopup, setTransactionsPopup] = useState<
    ITransactionResponse[]
  >([]);

  const queryTransactions = useGetTransactionsByDate(calendarDate, "Monthly");
  const transactions = queryTransactions.data ?? [];

  const showTransactions = (
    info: EventInfo,
    transactionsOnDate: ITransactionResponse[]
  ) => {
    setPopupCoords({
      top: info.point.y + 10 + "px",
      left: info.point.x - 150 + "px",
    });
    setTransactionsPopup(transactionsOnDate);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, type: "tween" }}
      className={`${gridDisposition} flex flex-col gap-y-4`}
    >
      <h3 className="font-semibold">Calendar</h3>
      {isPopupVisible && (
        <TransactionPopup
          coords={popupCoords!}
          transactions={transactionsPopup}
        />
      )}

      <Card classNames="dark:bg-slate-800 flex-1 py-2 px-4">
        <CalendarDep
          onActiveStartDateChange={({ activeStartDate }) =>
            setCalendarDate(activeStartDate)
          }
          minDetail="year"
          tileContent={({ date, view }) => {
            const transactionsOnHoveredDate = transactions.filter(
              (transaction) =>
                date.getDate() === transaction.date.getDate() &&
                view === "month"
            );

            return transactionsOnHoveredDate.length > 0 ? (
              <motion.span
                className={`absolute top-1 right-1 rounded-full bg-indigo-500  p-1 hover:animate-pulse`}
                onHoverStart={(_, info) => {
                  showTransactions(info, transactionsOnHoveredDate);
                  setIsPopupVisible(true);
                }}
                onHoverEnd={() => setIsPopupVisible(false)}
              />
            ) : null;
          }}
        />
      </Card>
    </motion.section>
  );
};
export default Calendar;
