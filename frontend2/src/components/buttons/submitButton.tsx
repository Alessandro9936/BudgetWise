import { PulseLoader } from "react-spinners";

type SubmitButtonProps = {
  isLoading: boolean;
  label: string;
  styles?: string;
};

const SubmitButton = ({ isLoading, label, styles }: SubmitButtonProps) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`${styles ? styles : "button-primary"} px-6`}
    >
      {!isLoading ? label : <PulseLoader size={8} color="#4f46e5" />}
    </button>
  );
};

export default SubmitButton;
