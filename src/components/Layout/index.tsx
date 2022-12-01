import { Link, Outlet } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useJwtRole } from "src/hooks/useJwtRole";
import { CustomUserRole } from "src/types";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import ProfileButton from "./ProfileButton";

export default function Layout() {
  const { hasuraToken } = useAuth();
  const { isLoggedIn, roleList } = useJwtRole(hasuraToken?.accessToken);
  return (
    <div className="pb-10">
      <div className="bg-black/50">
        <div className="flex flex-row justify-between items-center px-5 py-5">
          <div className="flex-1">
            <OnlyDustLogo />
          </div>
          <div className="flex flex-1 justify-center align-center text-3xl drop-shadow-lg saturate-200 outline-4 font-alfreda font-extrabold">
            <Link to={RoutePaths.Projects}>Projects</Link>
          </div>
          {roleList.includes(CustomUserRole.ProjectLead) && (
            <div className="flex flex-1 justify-center align-center text-3xl drop-shadow-lg saturate-200 outline-4 font-alfreda font-extrabold">
              <Link to={RoutePaths.MyProjects}>My Projects</Link>
            </div>
          )}
          <div className="flex flex-1 justify-end">{!isLoggedIn ? <GithubLink /> : <ProfileButton />}</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
