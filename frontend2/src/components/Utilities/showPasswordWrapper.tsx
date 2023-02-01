import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface IShowPasswordWrapper {
  isShowingPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ShowPasswordWrapper = ({
  isShowingPassword,
  setShowPassword,
  children,
}: IShowPasswordWrapper) => {
  return (
    <div className="relative -z-10">
      {children}

      {isShowingPassword ? (
        <AiOutlineEye
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          className="absolute top-1 right-0 cursor-pointer text-neutral-500 dark:text-neutral-400"
          size={19}
        />
      ) : (
        <AiOutlineEyeInvisible
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          className="absolute top-1 right-0 cursor-pointer text-neutral-500 dark:text-neutral-400"
          size={19}
        />
      )}
    </div>
  );
};

export default ShowPasswordWrapper;
