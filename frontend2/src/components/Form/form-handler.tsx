import SubmitButton from "../Buttons/SubmitButton";
import ButtonRedirect from "../Buttons/ButtonRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FormHandler = ({
  isLoading,
  submitLabel,
  isSubmitSuccessful,
  isSubmitError,
}: {
  isLoading: boolean;
  isSubmitSuccessful: boolean;
  isSubmitError: boolean;
  submitLabel: string;
}) => {
  const navigate = useNavigate();
  const [secondsToRedirect, setSecondsToRedirect] = useState(5);

  useEffect(() => {
    if (isSubmitSuccessful || isSubmitError) {
      const interval = setInterval(() => {
        setSecondsToRedirect((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSubmitSuccessful, isSubmitError]);

  useEffect(() => {
    if (secondsToRedirect === 0 && (isSubmitSuccessful || isSubmitError)) {
      navigate("..");
    }
  }, [secondsToRedirect]);

  return (
    <>
      {!isSubmitSuccessful && !isSubmitError && (
        <div className="ml-auto flex w-fit justify-end gap-x-2">
          <SubmitButton
            label={submitLabel}
            styles="px-6"
            isLoading={isLoading}
          />

          <ButtonRedirect
            redirect={".."}
            styles="px-6 bg-white text-purple-500 ring-1 ring-purple-500"
            label="Go back"
          />
        </div>
      )}
      {isSubmitSuccessful && !isLoading && (
        <div className="flex w-full items-center justify-end gap-x-2">
          <div className="flex flex-1 flex-col rounded-lg bg-green-500 py-[3px]  text-center text-white">
            <p className="font-semibold">
              {submitLabel.includes("budget") ? "Budget" : "Transaction"}{" "}
              successfully created
            </p>
            <p>You'll be redirected in {secondsToRedirect} seconds</p>
          </div>
          <ButtonRedirect
            redirect={".."}
            styles="px-6 bg-white text-purple-500 ring-1 ring-purple-500"
            label="Go back"
          />
        </div>
      )}
      {isSubmitError && !isLoading && (
        <div className="flex w-full items-center justify-end gap-x-2">
          <div className="flex flex-1 flex-col rounded-lg bg-red-500 py-[3px] text-center text-white">
            <p className="font-semibold">Something went wrong</p>
            <p>You'll be redirected in {secondsToRedirect} seconds</p>
          </div>
          <ButtonRedirect
            redirect={".."}
            styles=" px-6 bg-white text-purple-500 ring-1 ring-purple-500"
            label="Go back"
          />
        </div>
      )}
    </>
  );
};

export default FormHandler;
