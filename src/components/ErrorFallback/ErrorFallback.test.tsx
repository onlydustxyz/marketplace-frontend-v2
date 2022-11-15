import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import ErrorFallback from ".";

expect.extend(matchers);

describe('"ErrorFallback" component', () => {
  render(<ErrorFallback />);

  it("should display the logo", () => {
    expect(screen.queryByText("Try to refresh the app")).toBeInTheDocument();
  });
});
