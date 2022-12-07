import GithubLogo from "./GithubLogo";
import config from "src/config";
import { useFormatMessage } from "src/hooks/useIntl";

const GITHUB_SIGN_IN_URL = `${config.HASURA_AUTH_BASE_URL}/signin/provider/github`;

export default function GithubLink() {
  const formatMessage = useFormatMessage();
  return (
    <a href={GITHUB_SIGN_IN_URL}>
      <div className="flex flex-row items-center gap-4 w-fit rounded-xl p-4 bg-white">
        <div className="text-2xl md:flex hidden text-black font-alfreda font-bold">
          {formatMessage("signInWithGithub")}
        </div>
        <GithubLogo />
      </div>
    </a>
  );
}
