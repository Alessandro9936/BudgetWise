import React from "react";
import Card from "../../../components/UI/Card";
import Calendar from "react-calendar";
import "../../../components/styles/Calendar.css";

export function CalendarDashboard() {
  return (
    <section>
      <h3>Calendar</h3>
      <Card>
        <Calendar />
      </Card>
    </section>
  );
}
