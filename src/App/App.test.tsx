import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import App from ".";
import { createTestRouter, RoutePaths } from "src/routes";
import { AUTH_CODE_QUERY_KEY } from "src/pages/Login";
import { LOCAL_STORAGE_HASURA_TOKEN_KEY } from "src/hooks/useAuth";
import { checkLocalStorageValue, MemoryRouterProviderFactory } from "src/test/utils";
import { GET_PROJECTS_QUERY } from "src/pages/Projects";
import { GET_PROFILE_QUERY } from "src/pages/Profile";

const AUTH_CODE_TEST_VALUE = "code";
const LOGGING_IN_TEXT_QUERY = /logging in/i;
const AUTH_TOKEN_MISSING_TEXT_QUERY = /github authentication token missing !/i;
const TEST_USER_ID = "test-user-id";
const TEST_USER_EMAIL = "test@user.email";
const HASURA_TOKEN_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
};
const PROFILE_TEXT_QUERY = `Your user id is ${TEST_USER_ID} and your e-mail address is ${TEST_USER_EMAIL}`;
const TEST_PROJECT_ID = "test-project-id";

expect.extend(matchers);

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: HASURA_TOKEN_TEST_VALUE }),
  },
}));

const graphQlMocks = [
  {
    request: {
      query: GET_PROJECTS_QUERY,
    },
    result: {
      data: {
        projects: [{ id: TEST_PROJECT_ID }],
      },
    },
  },
  {
    request: {
      query: GET_PROFILE_QUERY,
      variables: {
        id: TEST_USER_ID,
      },
    },
    result: {
      data: {
        user: { id: TEST_USER_ID, email: TEST_USER_EMAIL },
      },
    },
  },
];

describe('"Login" page', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should log in and go to projects page if a refresh token is passed as a query parameter in the URL", async () => {
    const router = createTestRouter({
      initialEntries: [`${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`],
    });
    render(<App router={router} />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
      }),
    });
    await screen.findByText(LOGGING_IN_TEXT_QUERY);
    await screen.findByText(TEST_PROJECT_ID);
    expect(screen.queryByText(LOGGING_IN_TEXT_QUERY)).not.toBeInTheDocument();
    checkLocalStorageValue({
      key: LOCAL_STORAGE_HASURA_TOKEN_KEY,
      expectedIncludedObject: HASURA_TOKEN_TEST_VALUE,
    });
  });

  it("should be able to access the profile page and display profile info when having a token in local storage", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_HASURA_TOKEN_KEY, JSON.stringify(HASURA_TOKEN_TEST_VALUE));
    const router = createTestRouter({
      initialEntries: [RoutePaths.Profile],
    });
    render(<App router={router} />, {
      wrapper: MemoryRouterProviderFactory({
        mocks: graphQlMocks,
      }),
    });
    await screen.findByText(PROFILE_TEXT_QUERY);
  });

  it("should display an error message if no refresh token is passed as a query parameter in the URL", async () => {
    const router = createTestRouter({
      initialEntries: [RoutePaths.Login],
    });
    render(<App router={router} />, { wrapper: MemoryRouterProviderFactory({ mocks: graphQlMocks }) });
    await screen.findByText(AUTH_TOKEN_MISSING_TEXT_QUERY);
    checkLocalStorageValue({
      key: LOCAL_STORAGE_HASURA_TOKEN_KEY,
      expectNotToExist: true,
    });
  });

  it("should redirect to the projects page if the profile route is accessed without a token in the local storage", async () => {
    const router = createTestRouter({
      initialEntries: [RoutePaths.Profile],
    });
    render(<App router={router} />, { wrapper: MemoryRouterProviderFactory({ mocks: graphQlMocks }) });
    await screen.findByText(TEST_PROJECT_ID);
  });
});
