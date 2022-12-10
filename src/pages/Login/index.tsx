import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";

export const AUTH_CODE_QUERY_KEY = "refreshToken";

export default function Login() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const refreshToken = searchParams.get(AUTH_CODE_QUERY_KEY);
  const { T } = useT();
  useEffect(() => {
    if (refreshToken) {
      login(refreshToken);
    }
  }, [refreshToken]);
  return (
    <>
      {refreshToken && <div className="flex justify-center mt-10 text-2xl">{T("loggingIn")}</div>}
      {!refreshToken && (
        <div className="flex justify-center mt-10 text-2xl text-red-600">{T("githubAuthenticationTokenMissing")}</div>
      )}
    </>
  );
}
