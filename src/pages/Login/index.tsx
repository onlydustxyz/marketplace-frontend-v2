import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export const AUTH_CODE_QUERY_KEY = "refreshToken";

export default function Login() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const refreshToken = searchParams.get(AUTH_CODE_QUERY_KEY);
  useEffect(() => {
    if (refreshToken) {
      login(refreshToken);
    }
  }, [refreshToken]);
  return (
    <>
      {refreshToken && <div className="flex justify-center mt-10 text-2xl">Logging in ...</div>}
      {!refreshToken && (
        <div className="flex justify-center mt-10 text-2xl text-red-600">GitHub authentication token missing !</div>
      )}
    </>
  );
}
