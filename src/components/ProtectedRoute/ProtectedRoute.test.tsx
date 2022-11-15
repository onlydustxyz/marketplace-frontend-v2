import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { BrowserRouter } from "react-router-dom";

import ProtectedRoute from ".";
import { AuthProvider } from "src/hooks/useAuth";

expect.extend(matchers);

const CHILD_ELEMENT_TEXT = "child-test";

describe('"ProtectedRoute" component', () => {
  it("should display its child element when there is a token in the local storage", () => {
    window.localStorage.setItem("token", JSON.stringify({ code: "code" }));
    render(
      <AuthProvider>
        <ProtectedRoute>{CHILD_ELEMENT_TEXT}</ProtectedRoute>
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.queryByText(CHILD_ELEMENT_TEXT)).toBeInTheDocument();
  });

  it("should display its child element when there is a token in the local storage", () => {
    window.localStorage.clear();
    expect(screen.queryByText(CHILD_ELEMENT_TEXT)).not.toBeInTheDocument();
  });
});
