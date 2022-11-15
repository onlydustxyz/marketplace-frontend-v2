import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import Layout from ".";

expect.extend(matchers);

describe('"Layout" component', () => {
  render(<Layout />);

  const image = screen.getByRole("img", {
    name: /onlydust logo/i,
  });

  it("should display the logo", () => {
    expect(image).toBeInTheDocument();
  });
});
