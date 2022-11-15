import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

export const LOCAL_STORAGE_TOKEN_KEY = "token";
const LOGIN_LOADING_TIME_MS = 1000;

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const AuthContext = createContext<
  | {
      token: Record<string, string> | null | undefined;
      login: (data: Record<string, string>) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useLocalStorage<Record<string, string> | null>(LOCAL_STORAGE_TOKEN_KEY, null);
  const navigate = useNavigate();

  const login = async (data: Record<string, string>) => {
    await wait(LOGIN_LOADING_TIME_MS);
    setToken(data);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
