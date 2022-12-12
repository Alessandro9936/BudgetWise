import { ButtonRedirect } from "./ButtonRedirect";
import classes from "../styles/FormikActionButtons.module.css";
import { Button } from "./Button";
import { Loader } from "./Loader";

export const FormikActionButtons = ({ isSubmitting }) => {
  return (
    <div className={classes["form-buttons"]}>
      <Button type="submit" disabled={isSubmitting}>
        {!isSubmitting ? "Submit" : <Loader />}
      </Button>
      <ButtonRedirect redirectLink={".."} disabled={isSubmitting}>
        Go back
      </ButtonRedirect>
    </div>
  );
};
