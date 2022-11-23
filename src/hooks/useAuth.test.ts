import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useAuth } from "./useAuth";
import reactUse from "react-use";
import { MemoryRouterProviderFactory } from "src/test/utils";
import hasuraToken from "src/test/fixtures/hasuraToken.json";

const REFRESHED_TOKEN = { ...hasuraToken, accessToken: "1234" };

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: REFRESHED_TOKEN }),
  },
}));

describe("getToken", () => {
  it("should return null if no token stored", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.spyOn(reactUse, "useLocalStorage").mockImplementation(() => [null, vi.fn()]);
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    await expect(result.current.getToken()).resolves.toEqual(null);
  });

  it("should return token if up to date token is set", async () => {
    const token = { ...hasuraToken, creationDate: Date.now() };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.spyOn(reactUse, "useLocalStorage").mockImplementation(() => [token, vi.fn()]);
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    await expect(result.current.getToken()).resolves.toEqual(token);
  });

  it("should return null if no token stored", async () => {
    const setToken = vi.fn();
    const outdatedToken = { ...hasuraToken, creationDate: new Date("1992-01-27") };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.spyOn(reactUse, "useLocalStorage").mockImplementation(() => [outdatedToken, setToken]);
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    await expect(result.current.getToken()).resolves;
    expect(setToken).toHaveBeenCalledWith(expect.objectContaining(REFRESHED_TOKEN));
  });
});
