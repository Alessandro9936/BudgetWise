import GithubRedirect from "../components/Buttons/GitHubRedirect";
import Logo from "../components/UI/logo";
import ThemeToggle from "../components/Utilities/ThemeToggle";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-between p-4">
      <Logo redirect="/home" />
      <div className="flex items-center gap-2">
        <GithubRedirect />
        <ThemeToggle isOpen={false} />
      </div>
    </div>
  );
};

export default Header;
