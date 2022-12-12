import { TransactionPopup } from "./TransactionPopup";
import Card from "../../../components/UI/Card";
import Calendar from "react-calendar";

import "../../../components/styles/Calendar.css";
import { isSameDay } from "date-fns";
import { useState } from "react";

export function CalendarDashboard({ transactionMapped }) {
  const [previewVisibility, setPreviewVisibility] = useState(false);
  const [transactionsPreview, setTransactionsPreview] = useState([]);
  const [previewModalCoords, setPreviewModalCoords] = useState(null);

  const showPreview = (e, currentDate) => {
    setPreviewModalCoords({
      top: e.clientY + 10 + "px",
      left: e.clientX - 150 + "px",
    });

    const transactionOnDate = transactionMapped.filter((transaction) =>
      isSameDay(currentDate, transaction.date)
    );

    setTransactionsPreview(transactionOnDate);

    setPreviewVisibility(true);
  };

  return (
    <section>
      <h3>Calendar</h3>
      {previewVisibility && (
        <TransactionPopup
          coords={previewModalCoords}
          transactions={transactionsPreview}
        />
      )}

      <Card>
        <Calendar
          minDetail="year"
          tileContent={({ date, view }) => {
            return transactionMapped.map((transaction) => {
              if (isSameDay(date, transaction.date) && view === "month") {
                return (
                  <span
                    key={transaction._id}
                    className={`calendar-transaction ${
                      transaction.type === "income" ? "income" : "expense"
                    }`}
                    onMouseOver={(e) => showPreview(e, date)}
                    onMouseOut={() => setPreviewVisibility(false)}
                  />
                );
              }
            });
          }}
        />
      </Card>
    </section>
  );
}
