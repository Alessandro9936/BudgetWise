import Card from "@/components/wrapper/card";
import TransactionPopup from "./transactionPopup";
import {
  TransactionResponse,
  useGetTransactionsByDate,
} from "@/services/transaction-services";
import { useState } from "react";
import { transitionFadeInVariants } from "@/utils/reusableVariants";
import { AnimatePresence, EventInfo, motion } from "framer-motion";
import { Calendar as CalendarDep } from "react-calendar";
import "@/styles/calendar.css";
import ContentHeader from "@/components/ui/contentHeader";

const Calendar = ({ gridDisposition }: { gridDisposition: string }) => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [isPopupVisible, setIsPopupVisible] = useState<{
    info: EventInfo;
    transactionsOnDate: TransactionResponse[];
  } | null>(null);

  const queryTransactions = useGetTransactionsByDate(calendarDate, "Monthly");
  const transactions = queryTransactions.data ?? [];
  const isFetching = queryTransactions.isFetching;

  return (
    <motion.section
      variants={transitionFadeInVariants}
      initial="initial"
      animate="ending"
      transition={{ delay: 0.75, type: "tween" }}
      className={`${gridDisposition} flex flex-col gap-y-4`}
    >
      <ContentHeader isFetching={isFetching} sectionTitle="Calendar" />
      {/* Popup */}
      <AnimatePresence>
        {isPopupVisible && (
          <TransactionPopup
            popupInfo={isPopupVisible.info}
            transactions={isPopupVisible.transactionsOnDate}
          />
        )}
      </AnimatePresence>

      <Card classNames="dark:bg-slate-800 flex-1 py-2 px-4">
        <CalendarDep
          onActiveStartDateChange={({ activeStartDate }) =>
            setCalendarDate(activeStartDate)
          }
          minDetail="year"
          tileContent={({ date, view }) => {
            const transactionsOnDate = transactions.filter(
              (transaction) =>
                date.getDate() === transaction.date.getDate() &&
                view === "month"
            );

            return transactionsOnDate.length > 0 ? (
              <motion.span
                className={`absolute top-1 right-1 rounded-full bg-indigo-500  p-1 hover:animate-pulse`}
                //onHoverStart returns info of the hovered point, which are set as the preview coordinates of popup
                onHoverStart={(_, info) => {
                  setIsPopupVisible({ info, transactionsOnDate });
                }}
                onHoverEnd={() => setIsPopupVisible(null)}
              />
            ) : null;
          }}
        />
      </Card>
    </motion.section>
  );
};
export default Calendar;
