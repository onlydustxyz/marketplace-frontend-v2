import { describe, expect, it, vi } from "vitest";
import hasuraToken from "src/test/fixtures/hasuraToken.json";
import { getJwtFromStorage } from "./jwt";

vi.mock("src/infra/storage", () => ({
  storage: {
    local: {
      getItem: () => JSON.stringify(hasuraToken),
      setItem: () => null,
    },
  },
}));

describe("localStorage service", () => {
  it("should return JWT", () => {
    expect(getJwtFromStorage()).toStrictEqual(hasuraToken);
  });
});
