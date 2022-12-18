import React from "react";
import classes from "./FiltersSidebar.module.css";

import Card from "../../../components/UI/Card";
import { BarChart } from "react-feather";
import { Button } from "../../../components/UI/Button";

const InputField = ({ id, label, filter, setFilters, ...attributes }) => {
  const updateFiltersArray = (e) => {
    if (filter === "state" || filter === "budget") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filter]: prevFilters[filter].includes(e.target.value)
          ? prevFilters[filter].filter((value) => value !== e.target.value)
          : [...prevFilters[filter], e.target.value],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filter]: e.target.value,
      }));
    }
  };

  return (
    <li className={classes.field}>
      <input
        className={classes["radio-btn"]}
        {...attributes}
        onChange={updateFiltersArray}
      />
      <label htmlFor={id}>{id[0].toUpperCase() + id.slice(1)}</label>
    </li>
  );
};

const IconField = ({ icon, value, label, filter, setFilters }) => {
  const updateSortValue = () =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: value,
    }));
  return (
    <li className={classes.field} onClick={updateSortValue}>
      {icon}
      <span>{label}</span>
    </li>
  );
};

const FilterBlock = ({ children, label }) => {
  return (
    <ul className={classes.block}>
      <p className={classes["block-title"]}>{label}</p>
      {children}
    </ul>
  );
};

const budgets = [
  "Rent",
  "Groceries",
  "Bills",
  "Education",
  "Health & Fitness",
  "Personal care",
  "Shopping",
  "Entertaiment",
  "Travelling",
  "Others",
];

const transactionStatus = ["Paid", "To pay", "Upcoming"];
const transactionTimeSpans = [
  "December 2022",
  new Date().getFullYear().toString(),
  (new Date().getFullYear() - 1).toString(),
  (new Date().getFullYear() - 2).toString(),
];

export function FiltersSidebar({ setFilters }) {
  return (
    <section className={classes["sidebar-filters"]}>
      <h3>Filters</h3>
      <Card>
        <div className={classes.scroll}>
          <FilterBlock label="Transaction type">
            <InputField
              setFilters={setFilters}
              filter={"type"}
              type="radio"
              name="type"
              id="expense"
              value="expense"
            />
            <InputField
              setFilters={setFilters}
              filter={"type"}
              type="radio"
              name="type"
              id="income"
              value="income"
            />
          </FilterBlock>
          <FilterBlock label="Date range">
            {transactionTimeSpans.map((timeSpan) => {
              return (
                <InputField
                  setFilters={setFilters}
                  key={timeSpan}
                  filter="date"
                  type="radio"
                  name="date"
                  value={timeSpan.toLocaleLowerCase()}
                  id={timeSpan}
                />
              );
            })}
          </FilterBlock>
          <FilterBlock label="Amount">
            <IconField
              setFilters={setFilters}
              filter={"sorters"}
              icon={<BarChart style={{ rotate: "90deg" }} />}
              label="Lower to higher"
              value="-amount"
            />
            <IconField
              setFilters={setFilters}
              filter={"sorters"}
              icon={
                <BarChart
                  style={{ rotate: "90deg", transform: "scaleX(-1)" }}
                />
              }
              label="Higher to lower"
              value="amount"
            />
          </FilterBlock>
          <FilterBlock label="Invoice date">
            <IconField
              setFilters={setFilters}
              filter={"sorters"}
              icon={<BarChart style={{ rotate: "90deg" }} />}
              label="Lower to higher"
              value="-date"
            />
            <IconField
              setFilters={setFilters}
              filter={"sorters"}
              icon={
                <BarChart
                  style={{ rotate: "90deg", transform: "scaleX(-1)" }}
                />
              }
              label="Higher to lower"
              value="date"
            />
          </FilterBlock>
          <FilterBlock label="Transaction state">
            {transactionStatus.map((status) => {
              return (
                <InputField
                  setFilters={setFilters}
                  filter={"state"}
                  key={status}
                  type="checkbox"
                  name={status.replaceAll(" ", "").toLowerCase()}
                  value={status.replaceAll(" ", "").toLowerCase()}
                  id={status}
                />
              );
            })}
          </FilterBlock>
          <FilterBlock label="Budget">
            {budgets.map((budget) => {
              return (
                <InputField
                  setFilters={setFilters}
                  filter={"budget"}
                  key={budget}
                  type="checkbox"
                  name={budget.replaceAll(" ", "").toLowerCase()}
                  value={budget.replaceAll(" ", "").toLowerCase()}
                  id={budget}
                />
              );
            })}
          </FilterBlock>
          <Button>Clear filters</Button>
        </div>
      </Card>
    </section>
  );
}
