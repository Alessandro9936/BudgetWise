import { Link } from "react-router-dom";

const ButtonRedirect = ({
  redirect,
  styles,
  label,
}: {
  redirect: string;
  styles?: string;
  label: string;
}) => {
  return (
    <Link
      to={redirect}
      className={`rounded-lg py-3 text-center font-semibold transition disabled:pointer-events-none disabled:bg-slate-200 ${styles}`}
    >
      {label}
    </Link>
  );
};

export default ButtonRedirect;
