import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import Logo from ".";

expect.extend(matchers);

describe('"Logo" component', () => {
  render(<Logo />);

  const image = screen.getByRole("img", {
    name: /onlydust logo/i,
  });

  it("should display the logo", () => {
    expect(image).toBeInTheDocument();
  });
});
