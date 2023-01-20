import { PulseLoader } from "react-spinners";

interface ISubmitButton {
  isLoading: boolean;
  label: string;
}

const SubmitButton = ({ isLoading, label }: ISubmitButton) => {
  return (
    <button disabled={isLoading} type="submit" className="button-primary">
      {!isLoading ? label : <PulseLoader size={8} color="#4f46e5" />}
    </button>
  );
};

export default SubmitButton;
