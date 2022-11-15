import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import App, { RoutePaths } from ".";
import { AUTH_CODE_QUERY_KEY } from "src/pages/Login";
import { LOCAL_STORAGE_TOKEN_KEY } from "src/hooks/useAuth";
import { checkLocalStorageValue, MemoryRouterProviderFactory } from "src/test/utils";

const AUTH_CODE_TEST_VALUE = "code";
const LOGGING_IN_TEXT_QUERY = /logging in/i;
const LOGGED_IN_TEXT_QUERY = /logged in/i;
const AUTH_TOKEN_MISSING_TEXT_QUERY = /github authentication token missing !/i;

expect.extend(matchers);

describe('"Login" page', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should log in if a GitHub code is passed as a query parameter in the URL", async () => {
    render(<App />, {
      wrapper: MemoryRouterProviderFactory(`${RoutePaths.Login}?${AUTH_CODE_QUERY_KEY}=${AUTH_CODE_TEST_VALUE}`),
    });
    await screen.findByText(LOGGING_IN_TEXT_QUERY);
    await screen.findByText(LOGGED_IN_TEXT_QUERY);
    expect(screen.queryByText(LOGGING_IN_TEXT_QUERY)).not.toBeInTheDocument();
    checkLocalStorageValue({
      key: LOCAL_STORAGE_TOKEN_KEY,
      expectedValue: JSON.stringify({ [AUTH_CODE_QUERY_KEY]: AUTH_CODE_TEST_VALUE }),
    });
  });

  it("should display an error message if no GitHub code is passed as a query parameter in the URL", async () => {
    render(<App />, { wrapper: MemoryRouterProviderFactory(RoutePaths.Login) });
    await screen.findByText(AUTH_TOKEN_MISSING_TEXT_QUERY);
    checkLocalStorageValue({
      key: LOCAL_STORAGE_TOKEN_KEY,
      expectNotToExist: true,
    });
  });

  it("should redirect to the login page if the projects route is accessed without a token in the local storage", async () => {
    render(<App />, { wrapper: MemoryRouterProviderFactory(RoutePaths.Projects) });
    await screen.findByText(AUTH_TOKEN_MISSING_TEXT_QUERY);
  });
});
