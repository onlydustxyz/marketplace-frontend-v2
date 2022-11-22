import { Link, Outlet } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import GithubLink from "./GithubLink";
import Logo from "./OnlyDustLogo";

export default function Layout() {
  const { hasuraJwt } = useAuth();
  return (
    <div>
      <div className=" bg-black/50">
        <div className="flex flex-row justify-between items-center px-5 py-5">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="flex flex-1 justify-center align-center text-3xl drop-shadow-lg saturate-200 outline-4 font-alfreda font-extrabold">
            <Link to={RoutePaths.Projects}>Projects</Link>
          </div>
          <div className="flex flex-1 justify-center align-center text-3xl drop-shadow-lg saturate-200 outline-4 font-alfreda font-extrabold">
            {hasuraJwt && <Link to={RoutePaths.Profile}>Profile</Link>}
          </div>
          <div className="flex flex-1 justify-end">{!hasuraJwt && <GithubLink />}</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}