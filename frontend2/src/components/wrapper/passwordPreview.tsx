import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type ShowPasswordProps = {
  passwordVisible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const ShowPassword = ({
  passwordVisible,
  setPasswordVisible,
  children,
}: ShowPasswordProps) => {
  return (
    <div className="relative -z-10">
      {children}

      {passwordVisible ? (
        <AiOutlineEye
          onMouseDown={() => setPasswordVisible(true)}
          onMouseUp={() => setPasswordVisible(false)}
          onMouseLeave={() => setPasswordVisible(false)}
          className="absolute top-1 right-0 cursor-pointer text-neutral-500 dark:text-neutral-400"
          size={19}
        />
      ) : (
        <AiOutlineEyeInvisible
          onMouseDown={() => setPasswordVisible(true)}
          onMouseUp={() => setPasswordVisible(false)}
          onMouseLeave={() => setPasswordVisible(false)}
          className="absolute top-1 right-0 cursor-pointer text-neutral-500 dark:text-neutral-400"
          size={19}
        />
      )}
    </div>
  );
};

export default ShowPassword;
