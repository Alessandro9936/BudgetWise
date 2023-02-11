import { Link } from "react-router-dom";

const Logo = ({ redirect }: { redirect: string }) => {
  return (
    <Link to={redirect} className="text-2xl font-semibold">
      Budget<span className="text-indigo-500 dark:text-indigo-600">Wise</span>
    </Link>
  );
};

export default Logo;
