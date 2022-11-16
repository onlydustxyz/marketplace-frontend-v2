import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import Layout from ".";
import { AuthProvider, LOCAL_STORAGE_HASURA_JWT_KEY } from "src/hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

expect.extend(matchers);

const HASURA_JWT_TEST_VALUE = "test";
const ONLYDUST_LOGO_NAME_QUERY = /onlydust logo/i;
const GITHUB_LOGO_NAME_QUERY = /github logo/i;

describe('"Layout" component', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should always display the onlydust logo", async () => {
    render(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    await screen.findByRole("img", {
      name: ONLYDUST_LOGO_NAME_QUERY,
    });
  });

  it("should display the github logo when there is no hasura jwt in the local storage", async () => {
    render(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    await screen.findByRole("img", {
      name: GITHUB_LOGO_NAME_QUERY,
    });
  });

  it("should display the github logo if there is no hasura jwt", () => {
    window.localStorage.setItem(LOCAL_STORAGE_HASURA_JWT_KEY, JSON.stringify(HASURA_JWT_TEST_VALUE));
    render(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    expect(
      screen.getByRole("img", {
        name: ONLYDUST_LOGO_NAME_QUERY,
      })
    ).toBeInTheDocument();
  });
});
