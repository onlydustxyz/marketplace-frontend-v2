import githubLogo from "assets/img/github-logo.svg";
import { useFormatMessage } from "src/hooks/useIntl";

export default function GithubLogo() {
  const formatMessage = useFormatMessage();
  return <img className="md:w-16 w-8 hover:opacity-90" src={githubLogo} alt={formatMessage("githubLogo")} />;
}
