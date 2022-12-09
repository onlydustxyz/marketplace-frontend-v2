import GithubLogo from "./GithubLogo";
import config from "src/config";
import { useT } from "talkr";

const GITHUB_SIGN_IN_URL = `${config.HASURA_AUTH_BASE_URL}/signin/provider/github`;

export default function GithubLink() {
  const { T } = useT();
  return (
    <a href={GITHUB_SIGN_IN_URL}>
      <div className="flex flex-row items-center gap-4 w-fit rounded-xl p-4 bg-white">
        <div className="text-2xl md:flex hidden text-black font-alfreda font-bold">{T("signInWithGithub")}</div>
        <GithubLogo />
      </div>
    </a>
  );
}
