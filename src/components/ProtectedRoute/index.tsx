import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/routes";
import { useAuth } from "src/hooks/useAuth";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to={RoutePaths.Projects} />;
  }
  return <>{children}</>;
}
