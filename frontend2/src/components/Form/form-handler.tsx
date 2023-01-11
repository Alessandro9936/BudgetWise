import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../Buttons/SubmitButton";
import ButtonRedirect from "../Buttons/ButtonRedirect";

const FormHandler = ({
  isLoading,
  submitLabel,
  isSubmitSuccessful,
}: {
  isLoading: boolean;
  isSubmitSuccessful: boolean;
  submitLabel: string;
}) => {
  const navigate = useNavigate();
  const [secondsRedirect, setSecondsRedirect] = useState(5);

  useEffect(() => {
    if (isSubmitSuccessful) {
      const interval = setInterval(() => {
        setSecondsRedirect((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (secondsRedirect === 0 && isSubmitSuccessful) {
      navigate("..");
    }
  }, [secondsRedirect]);

  return !isSubmitSuccessful ? (
    <div className="ml-auto flex w-fit justify-end gap-x-2">
      <SubmitButton label={submitLabel} styles="px-6" isLoading={isLoading} />

      <ButtonRedirect
        redirect={".."}
        styles="mt-2 px-6 bg-white text-purple-500 ring-1 ring-purple-500"
        label="Go back"
      />
    </div>
  ) : (
    <div className="mt-4 text-center">
      <p className="font-semibold">Budget successfully created</p>
      <p>You will be redirected in {secondsRedirect} seconds</p>
    </div>
  );
};

export default FormHandler;
