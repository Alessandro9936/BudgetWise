import { Link } from "react-router-dom";

interface IRedirectlink {
  redirectTo: string;
  label: string;
}
const RedirectLink = ({ redirectTo, label }: IRedirectlink) => {
  return (
    <Link to={redirectTo} className="transition-colors hover:text-indigo-500">
      {label}
    </Link>
  );
};

export default RedirectLink;
