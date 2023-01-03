import { Link } from "react-router-dom";

const RedirectLink = ({
  redirectRoute,
  label,
}: {
  redirectRoute: string;
  label: string;
}) => {
  return (
    <Link
      to={redirectRoute}
      className="transition-colors hover:text-purple-500"
    >
      {label}
    </Link>
  );
};

export default RedirectLink;
