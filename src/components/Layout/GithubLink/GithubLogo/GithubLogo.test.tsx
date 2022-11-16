import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import GithubLogo from ".";

expect.extend(matchers);

const GITHUB_LOGO_NAME_QUERY = /github logo/i;

describe('"GithubLogo" component', () => {
  render(<GithubLogo />);

  const image = screen.getByRole("img", {
    name: GITHUB_LOGO_NAME_QUERY,
  });

  it("should display the logo", () => {
    expect(image).toBeInTheDocument();
  });
});
