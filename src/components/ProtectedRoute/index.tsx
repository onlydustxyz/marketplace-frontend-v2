import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { hasuraJwt } = useAuth();
  if (!hasuraJwt) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
