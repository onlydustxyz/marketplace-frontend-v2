import githubLogo from "assets/img/github-logo.svg";
import { useT } from "talkr";

export default function GithubLogo() {
  const { T } = useT();
  return <img className="md:w-16 w-8 hover:opacity-90" src={githubLogo} alt={T("githubLogo")} />;
}
