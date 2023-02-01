import { TbBrandGithub } from "react-icons/tb";
import useCheckMobile from "../../hooks/useCheckMobile";

const GithubRedirect = () => {
  const { isMobile } = useCheckMobile();

  return (
    <a
      href="https://github.com/Alessandro9936/S2I_FinalProject"
      target="_blank"
    >
      <TbBrandGithub size={isMobile ? 20 : 24} />
    </a>
  );
};

export default GithubRedirect;
