import React from "react";
import { PulseLoader } from "react-spinners";

// Allows to pass attributes of button without specifying them in the interface, for example onClick function can be passed to the component without any type
interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  label: string;
}

const DeleteButton = ({ isLoading, label, ...props }: DeleteButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      type="submit"
      className="button-delete px-6 transition-colors duration-100"
    >
      {!isLoading ? label : <PulseLoader size={8} color="#f87171" />}
    </button>
  );
};

export default DeleteButton;
