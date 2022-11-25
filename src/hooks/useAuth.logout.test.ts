import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useAuth } from "./useAuth";
import reactUse from "react-use";
import { MemoryRouterProviderFactory } from "src/test/utils";
import axios from "axios";
import config from "src/config";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("logout", () => {
  it("should reset token to null on logout", () => {
    const setToken = vi.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.spyOn(reactUse, "useLocalStorage").mockImplementation(() => [null, setToken]);
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    result.current.logout();
    expect(setToken).toHaveBeenCalledWith(null);
  });

  it("should revoke token on logout", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.spyOn(reactUse, "useLocalStorage").mockImplementation(() => [null, vi.fn()]);
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    result.current.logout();
    expect(axios.post).toHaveBeenCalledWith(`${config.HASURA_AUTH_BASE_URL}/signout`, expect.anything());
  });
});
