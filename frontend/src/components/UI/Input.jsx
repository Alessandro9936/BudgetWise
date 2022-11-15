import React from "react";
import classes from "./styles/Input.module.css";

export function Input({ label, ...inputAttributes }) {
  return (
    <div>
      <label htmlFor={inputAttributes.id}>{label}:</label>
      <input {...inputAttributes} />
    </div>
  );
}
