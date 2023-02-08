import GithubRedirect from "../components/links/githubRedirect";
import Logo from "../components/links/logo";
import ThemeToggle from "../components/ui/themeToggle";

const HomeHeader = () => {
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

export default HomeHeader;
