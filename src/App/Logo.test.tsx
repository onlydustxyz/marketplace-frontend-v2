import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import Logo from "./Logo";

expect.extend(matchers);

describe('"All projects" page', () => {
  render(<Logo />);

  const image = screen.getByRole("img", {
    name: /onlydust logo/i,
  });

  it("should not display a project with no contributions", () => {
    expect(image).toBeInTheDocument();
  });
});
