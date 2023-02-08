import { Link } from "react-router-dom";

type ButtonRedirectProps = {
  redirect: string;
  styles?: string;
  label: string;
};

const ButtonRedirect = ({ redirect, styles, label }: ButtonRedirectProps) => {
  return (
    <Link to={redirect} className={styles}>
      {label}
    </Link>
  );
};

export default ButtonRedirect;
