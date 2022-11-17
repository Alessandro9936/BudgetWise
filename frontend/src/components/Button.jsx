import React from "react";
import classes from "./styles/Button.module.css";

export function Button({ type, label }) {
  return <button type={type}>{label}</button>;
}
