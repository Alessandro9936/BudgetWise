import React from "react";

import { Formik } from "formik";

import classes from "./SignUp.module.css";
import FormikControl from "../../components/Utilities/FormikControl";

import { useNavigate } from "react-router-dom";
import { UserForm } from "../../components/Utilities/UserForm";
import { signUpSchema } from "./utils/SignUpSchema";
import { useMutation } from "react-query";
import axios from "axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  userBudget: 0,
  password: "",
};

export function SignUp() {
  const { mutate } = useMutation((values) => {
    return axios.post("/api/register", values);
  });
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        mutate(values, {
          onSuccess: async (data) => {
            if (data.status === 201) {
              navigate("/login");
              setSubmitting(false);
            }
          },
          onError: (error) => {
            const { param: field, msg: message } = error.response.data[0];
            setFieldError(field, message);
            setSubmitting(false);
          },
        });
      }}
    >
      {(formik) => (
        <UserForm
          isSubmitting={formik.isSubmitting}
          handleSubmit={formik.handleSubmit}
          title="Start budgeting for free"
          action="Register"
          redirectLabel="Have an account?"
          redirectAction="Login"
        >
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
        </UserForm>
      )}
    </Formik>
  );
}
