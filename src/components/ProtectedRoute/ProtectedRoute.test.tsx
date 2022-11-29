import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { BrowserRouter } from "react-router-dom";

import ProtectedRoute from ".";
import { AuthProvider, LOCAL_STORAGE_HASURA_TOKEN_KEY } from "src/hooks/useAuth";

expect.extend(matchers);

const CHILD_ELEMENT_TEXT = "child-test";
const HASURA_TOKEN_TEST_VALUE = "test";

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: HASURA_TOKEN_TEST_VALUE }),
  },
}));

describe('"ProtectedRoute" component', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should display its child element when there is a token in the local storage", () => {
    window.localStorage.setItem(LOCAL_STORAGE_HASURA_TOKEN_KEY, JSON.stringify(HASURA_TOKEN_TEST_VALUE));
    render(
      <AuthProvider>
        <ProtectedRoute>{CHILD_ELEMENT_TEXT}</ProtectedRoute>
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.queryByText(CHILD_ELEMENT_TEXT)).toBeInTheDocument();
  });

  it("should not display its child element when there is no token in the local storage", () => {
    window.localStorage.clear();
    expect(screen.queryByText(CHILD_ELEMENT_TEXT)).not.toBeInTheDocument();
  });
});
