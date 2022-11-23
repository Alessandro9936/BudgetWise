import React from "react";

import { Formik, Form } from "formik";

import classes from "./styles/SignUp.module.css";
import FormikControl from "../../components/FormikControl";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";

import { signUpSchema } from "./utils/signUpSchema";
import { registerNewUserHandler } from "./services/signUpQuery";

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
      onSubmit={async (values, { setSubmitting }) => {}}
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
              disabled={formik.isSubmitting ? true : false}
            />
            <FormikControl
              control="input"
              label="Last name"
              name="lastName"
              type="text"
              placeholder="Smidth"
              disabled={formik.isSubmitting ? true : false}
            />
          </div>
          <FormikControl
            control="input"
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            disabled={formik.isSubmitting ? true : false}
          />
          <FormikControl
            control="input"
            label="Your starting budget"
            name="userBudget"
            type="number"
            disabled={formik.isSubmitting ? true : false}
          />
          <FormikControl
            control="input"
            label="Password"
            name="password"
            type="password"
            disabled={formik.isSubmitting ? true : false}
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

          <Button type="submit" disabled={formik.isSubmitting ? true : false}>
            {!formik.isSubmitting ? "Create account" : <Loader />}
          </Button>

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
