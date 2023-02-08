import { Link } from "react-router-dom";

type RedirectLinkProps = {
  redirectTo: string;
  label: string;
};
const RedirectLink = ({ redirectTo, label }: RedirectLinkProps) => {
  return (
    <Link to={redirectTo} className="transition-colors hover:text-indigo-500">
      {label}
    </Link>
  );
};

export default RedirectLink;
