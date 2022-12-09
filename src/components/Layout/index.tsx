import { Link, Outlet } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";
import { useJwtRole } from "src/hooks/useJwtRole";
import { CustomUserRole, HasuraUserRole } from "src/types";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import ProfileButton from "./ProfileButton";

export default function Layout() {
  const { hasuraToken } = useAuth();
  const { isLoggedIn, roleList } = useJwtRole(hasuraToken?.accessToken);
  const { T } = useT();
  return (
    <div>
      <div className="bg-black/50">
        <div className="flex flex-row justify-between items-center px-5 py-5">
          <div className="flex-1">
            <OnlyDustLogo />
          </div>
          <div className="flex flex-1 justify-center align-center text-3xl drop-shadow-lg saturate-200 outline-4 font-alfreda font-extrabold">
            <Link to={RoutePaths.Projects}>{T("projects")}</Link>
          </div>
          {roleList.includes(CustomUserRole.ProjectLead) && (
            <div className="flex flex-1 justify-center align-center text-3xl drop-shadow-lg saturate-200 outline-4 font-alfreda font-extrabold">
              <Link to={RoutePaths.MyProjects}>{T("myProjects")}</Link>
            </div>
          )}
          {roleList.includes(HasuraUserRole.User) && (
            <div className="flex flex-1 justify-center align-center text-3xl drop-shadow-lg saturate-200 outline-4 font-alfreda font-extrabold">
              <Link to={RoutePaths.MyContributions}>{T("myContributions")}</Link>
            </div>
          )}
          <div className="flex flex-1 justify-end">{!isLoggedIn ? <GithubLink /> : <ProfileButton />}</div>
        </div>
      </div>
      <div className="container mx-auto pb-10">
        <Outlet />
      </div>
    </div>
  );
}
