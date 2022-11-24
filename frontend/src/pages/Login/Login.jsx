import { UserForm } from "../../components/Utilities/UserForm";
import { Formik } from "formik";
import { logInSchema } from "./utils/loginSchema";
import FormikControl from "../../components/Utilities/FormikControl";
import { useNavigate } from "react-router-dom";
import { userActionHandler } from "../../services/userAccess";
import { generateAccessToken } from "../../services/generateToken";

const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const mutation = userActionHandler();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={logInSchema}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        mutation.mutate(
          { userData: values, endpoint: "login" },
          {
            onSuccess: async (data) => {
              if (data.status === 200 && data.data) {
                try {
                  await generateAccessToken();
                  navigate("/dashboard");
                  setSubmitting(false);
                } catch (err) {
                  console.log(err);
                }
              }
            },
            onError: (error) => {
              const { param: field, msg: message } = error.response.data[0];
              setFieldError(field, message);
              setSubmitting(false);
            },
          }
        );
      }}
    >
      {(formik) => (
        <UserForm
          isSubmitting={formik.isSubmitting}
          handleSubmit={formik.handleSubmit}
          title="Login in to your account"
          action="Login"
          redirectLabel="Don't have an account?"
          redirectAction="Register"
        >
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
            label="Password"
            name="password"
            type="password"
            disabled={formik.isSubmitting ? true : false}
          />
        </UserForm>
      )}
    </Formik>
  );
}
