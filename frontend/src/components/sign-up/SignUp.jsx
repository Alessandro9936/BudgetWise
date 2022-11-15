import React from "react";

import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

import classes from "./SignUp.module.css";

export function SignUp() {
  return (
    <form className={classes["form-container"]}>
      <h1>Start budgeting for free</h1>
      <div className={classes["flex-field"]}>
        <Input
          type="text"
          id="first-name"
          name="first-name"
          label="First name"
          placeholder="Mario"
          required={true}
        />
        <Input
          type="text"
          id="last-name"
          name="last-name"
          label="Last name"
          placeholder="Rossi"
        />
      </div>
      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        placeholder="mariorossi@example.com"
        required={true}
      />
      <Input
        type="number"
        id="user-budget"
        name="user-budget"
        label="Your starting budget"
        required={true}
      />
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        required={true}
      />
      <ul className={classes["passw-requirements"]}>
        <div>
          <li>A minimum of 8 character</li>
          <li>At least one lowercase letter</li>
        </div>
        <div>
          <li>At least one number</li>
          <li>At least one upper letter</li>
        </div>
      </ul>
      <Button type="submit" label="Create account" />
      <p className={classes["sign-in"]}>
        Have an account?{" "}
        <a href="#" className={classes["sign-in__link"]}>
          Sign in
        </a>
      </p>
    </form>
  );
}
