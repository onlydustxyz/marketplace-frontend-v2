import { LOCAL_STORAGE_HASURA_JWT_KEY } from "src/hooks/useAuth";
import { HasuraToken } from "src/types";
import { getItem, setItem } from "src/infra/localStorage";

export const getJwtFromStorage = (): HasuraToken | null => {
  const jwt = getItem(LOCAL_STORAGE_HASURA_JWT_KEY);
  if (!jwt) return null;

  try {
    return JSON.parse(jwt);
  } catch {
    console.error("Failed to parse JWT, clearing the local storage");
    setItem(LOCAL_STORAGE_HASURA_JWT_KEY, "");
    return null;
  }
};
