import classes from "../styles/UserActionForm.module.css";
import { Button } from "../UI/Button";
import { Loader } from "../UI/Loader";
import { RedirectLink } from "../UI/RedirectLinks";

export default function UserActionForm({
  children,
  onSubmit,
  formTitle,
  formState,
  redirectLabel,
  redirectAction,
}) {
  return (
    <form className={classes["form-container"]} onSubmit={onSubmit}>
      <h1>{formTitle}</h1>
      {children}
      <Button
        type="submit"
        disabled={
          !formState.isValid ||
          (!formState.isSubmitSuccessful && formState.isSubmitted)
        }
      >
        {!formState.isSubmitting ? "Submit" : <Loader />}
      </Button>

      <RedirectLink label={redirectLabel} action={redirectAction} />
    </form>
  );
}
