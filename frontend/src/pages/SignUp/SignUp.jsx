import React from "react";

import { Form } from "react-router-dom";

import { Formik } from "formik";
import * as yup from "yup";

import classes from "./styles/SignUp.module.css";
import FormikControl from "../../components/FormikControl";
import { Button } from "../../components/Button";

const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, {
      excludeEmptyString: true,
      message: "Only letters allowed.",
    })
    .required("First name is required."),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, {
      excludeEmptyString: true,
      message: "Only letters allowed.",
    })
    .required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  userBudget: yup
    .number()
    .integer()
    .required("Please inserting your starting budget"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  userBudget: 0,
  password: "",
};

export function SignUp() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form
          onSubmit={formik.handleSubmit}
          className={classes["form-container"]}
        >
          <h1>Start budgeting for free</h1>
          <div className={classes["flex-field"]}>
            <FormikControl
              control="input"
              label="First name"
              name="firstName"
              type="text"
              placeholder="John"
            />
            <FormikControl
              control="input"
              label="Last name"
              name="lastName"
              type="text"
              placeholder="Smidth"
            />
          </div>
          <FormikControl
            control="input"
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
          />
          <FormikControl
            control="input"
            label="Your starting budget"
            name="userBudget"
            type="number"
          />
          <FormikControl
            control="input"
            label="Password"
            name="password"
            type="password"
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
          {!formik.isSubmitting && (
            <Button type="submit" label="Create account" />
          )}

          <p className={classes["sign-in"]}>
            Have an account?
            <a href="#" className={classes["sign-in__link"]}>
              Sign in
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
}
