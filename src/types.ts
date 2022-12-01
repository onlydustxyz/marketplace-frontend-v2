export enum HasuraUserRole {
  Public = "public",
  User = "user",
}

export enum CustomUserRole {
  ProjectLead = "project_lead",
}

export type UserRole = HasuraUserRole | CustomUserRole;

export type HasuraToken = {
  accessToken: string;
  accessTokenExpiresIn: number;
  creationDate: Date;
  refreshToken: Uuid;
  user: User;
};

export type User = {
  id: Uuid;
  createdAt: Date;
  displayName: string;
  avatarUrl: Url | null;
  locale: Locale;
  email: Email;
  isAnonymous: boolean;
  defaultRole: HasuraUserRole;
  metadata: Record<string, unknown>;
  emailVerified: boolean;
  phoneNumber: PhoneNumber | null;
  phoneNumberVerified: boolean;
  activeMfaType: null;
  roles: HasuraUserRole[];
};

type Date = string;
type Url = string;
type Uuid = string;
type Email = string;
type PhoneNumber = string;
type Locale = "en" | "fr";

export const CLAIMS_KEY = "https://hasura.io/jwt/claims";
export const PROJECTS_LED_KEY = "x-hasura-projects_leaded";

interface ObjectWithClaimsKey {
  [CLAIMS_KEY]: unknown;
}

interface ObjectWithProjectsLedKey {
  [PROJECTS_LED_KEY]: unknown;
}

export interface HasuraJWT {
  [CLAIMS_KEY]: {
    [PROJECTS_LED_KEY]: string;
  };
}
