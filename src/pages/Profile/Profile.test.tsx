import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import ProfilePage from ".";
import { LOCAL_STORAGE_HASURA_TOKEN_KEY } from "src/hooks/useAuth";
import { GET_PROFILE_QUERY } from "src/pages/Profile";
import { CLAIMS_KEY, Email, PaymentReceiverType, PayoutSettingsType, PROJECTS_LED_KEY, UserInfo } from "src/types";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory } from "src/test/utils";
import { UPDATE_USER_MUTATION } from "./components/ProfileForm";

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
    payoutSettings: {
      type: PayoutSettingsType.ETH,
      settings: {
        ethWalletAddress: "0x1234567890",
      },
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

const buildMockProfileQuery = (userId: string, userResponse: UserInfo) => ({
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
});

const buildMockMutationUpdateUser = (userId: string, email: Email, metadata: UserInfo["metadata"]) => ({
  request: {
    query: UPDATE_USER_MUTATION,
    variables: { userId, email, metadata },
  },
  result: { data: { email, metadata } },
});

describe('"Profile" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_HASURA_TOKEN_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    render(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [
          buildMockProfileQuery(mockUser.id, mockUser),
          buildMockMutationUpdateUser(mockUser.id, mockUser.email, mockUser.metadata),
        ],
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
    userEvent.clear(await screen.findByLabelText<HTMLInputElement>("FirstName"));
    expect((await screen.findByLabelText<HTMLInputElement>("Email")).value).toBe("");
    userEvent.click(await screen.findByText("Send"));
    waitFor(() => {
      const errorMessages = screen.getAllByText("Required");
      expect(errorMessages.length).toBe(2);
    });
  });

  it("should display success message on success", async () => {
    userEvent.click(await screen.findByText("Send"));
    waitFor(() => {
      const successMessage = screen.getByText("Your data has been saved!");
      expect(successMessage).toBeInTheDocument();
    });
  });
});
