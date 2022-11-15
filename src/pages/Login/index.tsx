import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export const AUTH_CODE_QUERY_KEY = "code";

export default function Login() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const code = searchParams.get(AUTH_CODE_QUERY_KEY);
  useEffect(() => {
    if (code) {
      login({ code });
    }
  }, [code]);
  return (
    <>
      {code && <div className="flex justify-center mt-10 text-2xl">Logging in ...</div>}
      {!code && (
        <div className="flex justify-center mt-10 text-2xl text-red-600">GitHub authentication token missing !</div>
      )}
    </>
  );
}
