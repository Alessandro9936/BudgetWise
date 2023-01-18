import SubmitButton from "../Buttons/SubmitButton";
import ButtonRedirect from "../Buttons/ButtonRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface IFormHandler {
  isLoading: boolean;
  isSubmitSuccessful: boolean;
  submitLabel: string;
  redirect?: string;
  children: React.ReactNode;
}

const FormHandler = ({
  isLoading,
  submitLabel,
  isSubmitSuccessful,
  redirect,
  children,
}: IFormHandler) => {
  const navigate = useNavigate();
  const [secondsToRedirect, setSecondsToRedirect] = useState(5);

  useEffect(() => {
    if (isSubmitSuccessful) {
      const interval = setInterval(() => {
        setSecondsToRedirect((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (secondsToRedirect === 0 && isSubmitSuccessful) {
      navigate(redirect ?? "..");
    }
  }, [secondsToRedirect]);

  return (
    <>
      {!isSubmitSuccessful && (
        <div className="ml-auto flex w-fit justify-end gap-x-2">
          <SubmitButton
            label={submitLabel}
            styles="px-6"
            isLoading={isLoading}
          />

          <ButtonRedirect
            redirect={redirect ?? ".."}
            styles="px-6 bg-white text-purple-500 ring-1 ring-purple-500"
            label="Go back"
          />
        </div>
      )}
      {isSubmitSuccessful && !isLoading && (
        <div className="flex w-full items-center justify-end gap-x-2">
          <div className="flex flex-1 flex-col rounded-lg bg-green-500 py-[3px]  text-center text-white">
            {children}
            <p>You'll be redirected in {secondsToRedirect} seconds</p>
          </div>
          <ButtonRedirect
            redirect={redirect ?? ".."}
            styles="px-6 bg-white text-purple-500 ring-1 ring-purple-500"
            label="Go back"
          />
        </div>
      )}
    </>
  );
};

export default FormHandler;
