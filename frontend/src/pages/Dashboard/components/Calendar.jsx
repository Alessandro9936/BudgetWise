import { TransactionPopup } from "./TransactionPopup";
import React, { useState } from "react";
import Card from "../../../components/UI/Card";
import Calendar from "react-calendar";

import "../../../components/styles/Calendar.css";
import { isSameDay } from "date-fns";

export function CalendarDashboard({ transactionMapped }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [transactionPopup, setTransactionPopup] = useState();
  const [modalCoords, setModalCoords] = useState(null);

  const showPreview = (e, date) => {
    setModalCoords({
      top: e.clientY + 10 + "px",
      left: e.clientX - 150 + "px",
    });

    setTransactionPopup(
      transactionMapped.filter((transaction) =>
        isSameDay(date, transaction.date)
      )
    );

    setModalVisibility(true);
  };

  return (
    <section>
      <h3>Calendar</h3>
      {modalVisibility && (
        <TransactionPopup
          coords={modalCoords}
          transactions={transactionPopup}
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
                    key={transaction.id}
                    className={`calendar-transaction ${
                      transaction.type === "income" ? "income" : "expense"
                    }`}
                    onMouseOver={(e) => showPreview(e, date)}
                    onMouseOut={() => setModalVisibility(false)}
                  ></span>
                );
              }
            });
          }}
        />
      </Card>
    </section>
  );
}
