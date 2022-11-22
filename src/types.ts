export enum USER_ROLES {
  PUBLIC = "public",
  USER = "user",
}

export type HasuraToken = {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: Uuid;
  user: {
    id: Uuid;
    createdAt: Date;
    displayName: string;
    avatarUrl: Url | null;
    locale: Locale;
    email: Email;
    isAnonymous: boolean;
    defaultRole: USER_ROLES;
    metadata: Record<string, unknown>;
    emailVerified: boolean;
    phoneNumber: PhoneNumber | null;
    phoneNumberVerified: boolean;
    activeMfaType: null;
    roles: USER_ROLES[];
  };
};

type Date = string;
type Url = string;
type Uuid = string;
type Email = string;
type PhoneNumber = string;
type Locale = "en" | "fr";
