import React from "react";
import { Button } from "../UI/Button";
import { ButtonRedirect } from "../UI/ButtonRedirect";
import { Loader } from "../UI/Loader";
import { SuccessRedirect } from "../UI/SuccessRedirect";
export function ModalFormActions({ formState }) {
  const { isSubmitSuccessful, isSubmitting, isValid } = formState;
  return (
    <>
      {!isSubmitSuccessful && (
        <>
          <Button type="submit" disabled={isSubmitting}>
            {!isSubmitting ? "Submit" : <Loader />}
          </Button>
          <ButtonRedirect redirectLink={".."} disabled={isSubmitting}>
            Go back
          </ButtonRedirect>
        </>
      )}
      {isSubmitSuccessful && isValid && (
        <SuccessRedirect isSubmitSuccessful={isSubmitSuccessful} />
      )}
    </>
  );
}
