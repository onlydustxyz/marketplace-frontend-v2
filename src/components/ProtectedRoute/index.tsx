import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useJwtRole } from "src/hooks/useJwtRole";
import { HasuraUserRole, UserRole } from "src/types";

interface ProtectedRouteProps extends PropsWithChildren {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  allowedRoles = [HasuraUserRole.Public, HasuraUserRole.User],
  children,
}: ProtectedRouteProps) {
  const { hasuraToken } = useAuth();
  const { role } = useJwtRole(hasuraToken?.accessToken);
  if (role && allowedRoles && allowedRoles.indexOf(role) < 0) {
    return <Navigate to={RoutePaths.Projects} />;
  }
  return <>{children}</>;
}
