import axios from "axios";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { RoutePaths } from "src/App";
import config from "src/config";
import { HasuraToken } from "src/types";

export const LOCAL_STORAGE_HASURA_JWT_KEY = "hasura_jwt";

type AuthContextType = {
  hasuraJwt: HasuraToken | null;
  login: (data: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [hasuraJwt, setHasuraJwt] = useLocalStorage<HasuraToken | null>(LOCAL_STORAGE_HASURA_JWT_KEY, null);
  const navigate = useNavigate();

  const login = async (refreshToken: string) => {
    const accessToken = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
      refreshToken,
    });
    setHasuraJwt(accessToken.data || null);
    navigate(RoutePaths.Projects);
  };

  const logout = () => {
    setHasuraJwt(null);
    navigate(RoutePaths.Login, { replace: true });
  };

  const value = useMemo(
    () => ({
      hasuraJwt: hasuraJwt ?? null,
      login,
      logout,
    }),
    [hasuraJwt]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
