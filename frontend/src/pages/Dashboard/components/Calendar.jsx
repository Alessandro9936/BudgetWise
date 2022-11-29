import { TransactionPopup } from "./TransactionPopup";
import React, { useEffect, useState } from "react";
import Card from "../../../components/UI/Card";
import Calendar from "react-calendar";

import "../../../components/styles/Calendar.css";

export function CalendarDashboard({ setDashboardDate, transactionMapped }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [transactionPopup, setTransactionPopup] = useState(null);
  const [modalCoords, setModalCoords] = useState(null);

  const [activeDate, setActiveDate] = useState(new Date());

  const showPreview = (e, transaction) => {
    setModalCoords({
      top: e.clientY + 10 + "px",
      left: e.clientX - 150 + "px",
    });

    setTransactionPopup(transaction);

    setModalVisibility(true);
  };

  useEffect(() => {
    setDashboardDate(activeDate);
  }, [activeDate]);

  return (
    <section>
      <h3>Calendar</h3>
      {modalVisibility && (
        <TransactionPopup coords={modalCoords} transaction={transactionPopup} />
      )}

      <Card>
        <Calendar
          minDetail="year"
          onChange={setActiveDate}
          tileContent={({ date, view }) => {
            return transactionMapped.map((transaction) => {
              if (
                new Date(transaction.date).getTime() ===
                  new Date(date).getTime() &&
                view === "month"
              ) {
                return (
                  <span
                    key={transaction.id}
                    className={`calendar-transaction ${
                      transaction.type === "income" ? "income" : "expense"
                    }`}
                    onMouseOver={(e) => showPreview(e, transaction)}
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
