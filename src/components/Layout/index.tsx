import { Outlet } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import GithubLogo from "./GithubLogo";
import Logo from "./Logo";
import config from "src/config";

const GITHUB_SIGN_IN_URL = `${config.HASURA_AUTH_BASE_URL}/signin/provider/github`;

export default function Layout() {
  const { hasuraJwt } = useAuth();
  return (
    <div>
      <div className=" bg-black/50">
        <div className="flex flex-row justify-between items-center px-5 py-5">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="flex flex-1 justify-center align-center text-4xl drop-shadow-lg saturate-200 outline-4 font-extrabold">
            OnlyDust
          </div>
          <div className="flex flex-1 justify-end">
            {!hasuraJwt && (
              <a href={GITHUB_SIGN_IN_URL} className="rounded-xl p-4 bg-white">
                <div className="flex flex-row items-center gap-4">
                  <div className="text-2xl text-black font-bold">Sign in with Github</div>
                  <GithubLogo />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
