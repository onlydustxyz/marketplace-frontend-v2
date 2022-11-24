import axios from "axios";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { RoutePaths } from "src/routes";
import config from "src/config";
import { HasuraToken, User } from "src/types";

export const LOCAL_STORAGE_HASURA_TOKEN_KEY = "hasura_token";

type AuthContextType = {
  isLoggedIn: boolean;
  getToken: () => Promise<HasuraToken | null>;
  login: (refreshToken: string) => void;
  logout: () => void;
  getUser: () => User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

const checkTokenValidity = (token: HasuraToken): boolean => {
  const creationDate = new Date(token.creationDate);
  const expirationDate = creationDate.setSeconds(creationDate.getSeconds() + token.accessTokenExpiresIn);

  return expirationDate > Date.now();
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [hasuraToken, setHasuraToken] = useLocalStorage<HasuraToken | null>(LOCAL_STORAGE_HASURA_TOKEN_KEY, null);
  const navigate = useNavigate();

  const getToken = async (): Promise<HasuraToken | null> => {
    if (!hasuraToken) return null;
    if (checkTokenValidity(hasuraToken)) return hasuraToken;

    return await consumeRefreshToken(hasuraToken.refreshToken);
  };

  const getUser = () => (hasuraToken ? hasuraToken.user : null);

  const consumeRefreshToken = async (refreshToken: string): Promise<HasuraToken> => {
    const accessToken = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
      refreshToken,
    });

    if (!accessToken.data) throw new Error("Could not refresh token");
    const hasuraToken = { ...accessToken.data, creationDate: Date.now() };
    setHasuraToken(hasuraToken);

    return hasuraToken;
  };

  const login = async (refreshToken: string) => {
    await consumeRefreshToken(refreshToken);
    navigate(RoutePaths.Projects);
  };

  const logout = () => {
    setHasuraToken(null);
    navigate(RoutePaths.Login, { replace: true });
  };

  const value = useMemo(
    () => ({
      isLoggedIn: hasuraToken !== null,
      getUser,
      getToken,
      login,
      logout,
    }),
    [hasuraToken]
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
