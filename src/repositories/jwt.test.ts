import { describe, expect, it, vi } from "vitest";
import hasuraToken from "src/test/fixtures/hasuraToken.json";
import { getJwtFromStorage } from "./jwt";
import * as storage from "src/infra/localStorage";

describe("localStorage service", () => {
  it("should return JWT", () => {
    vi.spyOn(storage, "getItem").mockImplementation(() => JSON.stringify(hasuraToken));
    expect(getJwtFromStorage()).toStrictEqual(hasuraToken);
  });

  it("should return null if no token", () => {
    vi.spyOn(storage, "getItem").mockImplementation(() => null);
    expect(getJwtFromStorage()).toStrictEqual(null);
  });

  it("should reset storage if data is malformed", () => {
    vi.spyOn(storage, "getItem").mockImplementation(() => "toto");
    vi.spyOn(storage, "setItem").mockImplementation(() => null);
    expect(getJwtFromStorage()).toStrictEqual(null);
    expect(storage.setItem).toHaveBeenCalledOnce();
  });
});
