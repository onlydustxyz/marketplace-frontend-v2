import { LOCAL_STORAGE_HASURA_JWT_KEY } from "src/hooks/useAuth";
import { HasuraToken } from "src/types";
import { storage } from "src/infra/storage";

export const getJwtFromStorage = (): HasuraToken | null => {
  const jwt = storage.local.getItem(LOCAL_STORAGE_HASURA_JWT_KEY);
  if (!jwt) return null;

  try {
    return JSON.parse(jwt);
  } catch {
    console.error("Failed to parse JWT, clearing the local storage");
    storage.local.setItem(LOCAL_STORAGE_HASURA_JWT_KEY, "");
    return null;
  }
};
