import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import ProfilePage from ".";
import { LOCAL_STORAGE_HASURA_TOKEN_KEY } from "src/hooks/useAuth";
import { GET_PROFILE_QUERY } from "src/pages/Profile";
import { CLAIMS_KEY, PaymentReceiverType, PROJECTS_LED_KEY, User } from "src/types";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory } from "src/test/utils";

const mockUser = {
  id: "test-user-id",
  email: "test@user.email",
  metadata: {
    paymentReceiverType: PaymentReceiverType.INDIVIDUAL,
    firstName: "Nicolas",
    lastName: "Ngomai",
    location: {
      address: "18 rue Lakanal",
      city: "Grenoble",
      country: "France",
      zipcode: "38000",
    },
  },
};

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: mockUser.id,
  },
  accessToken: "SOME_TOKEN",
};

expect.extend(matchers);

vi.mock("jwt-decode", () => ({
  default: () => ({ [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: '{"test-project-id"}' } }),
}));

const buildMockProfileQuery = (userId: string, userResponse: any) => [
  {
    request: {
      query: GET_PROFILE_QUERY,
      variables: {
        id: userId,
      },
    },
    result: {
      data: {
        user: userResponse,
      },
    },
  },
];

describe('"Profile" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_HASURA_TOKEN_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    render(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: buildMockProfileQuery(mockUser.id, mockUser),
      }),
    });
  });

  it("should print form with default values", async () => {
    await screen.findByText("Edit Profile");
    expect((await screen.findByLabelText<HTMLInputElement>("FirstName")).value).toBe(mockUser.metadata.firstName);
    expect((await screen.findByLabelText<HTMLInputElement>("LastName")).value).toBe(mockUser.metadata.lastName);
    expect((await screen.findByLabelText<HTMLInputElement>("Email")).value).toBe(mockUser.email);
    expect((await screen.findByLabelText<HTMLInputElement>("Location")).value).toBe(mockUser.metadata.location.address);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("zipcode")).value).toBe(
      mockUser.metadata.location.zipcode
    );
    expect((await screen.findByPlaceholderText<HTMLInputElement>("city")).value).toBe(mockUser.metadata.location.city);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("country")).value).toBe(
      mockUser.metadata.location.country
    );
  });

  it("should display error when required field missing", async () => {
    userEvent.clear(await screen.findByLabelText<HTMLInputElement>("Email"));
    userEvent.click(await screen.findByText("Send"));
    await screen.findByText("Required");
  });
});
