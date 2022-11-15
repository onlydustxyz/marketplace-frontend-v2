import axios from "axios";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { RoutePaths } from "src/App";
import config from "src/config";

export const LOCAL_STORAGE_HASURA_JWT_KEY = "hasura_jwt";

const AuthContext = createContext<
  | {
      hasuraJwt: any;
      login: (data: string) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [hasuraJwt, setHasuraJwt] = useLocalStorage<Record<string, string> | null>(LOCAL_STORAGE_HASURA_JWT_KEY, null);
  const navigate = useNavigate();

  const login = async (refreshToken: string) => {
    const accessToken = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
      refreshToken,
    });
    setHasuraJwt(accessToken.data);
    navigate(RoutePaths.Projects);
  };

  const logout = () => {
    setHasuraJwt(null);
    navigate(RoutePaths.Login, { replace: true });
  };

  const value = useMemo(
    () => ({
      hasuraJwt,
      login,
      logout,
    }),
    [hasuraJwt]
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
