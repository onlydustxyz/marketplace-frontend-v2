import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";

export const MemoryRouterProviderFactory =
  (route: string) =>
  ({ children }: PropsWithChildren) =>
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;

interface CheckLocalStorageValueProps<T> {
  key: string;
  expectedValue?: T;
  expectNotToExist?: boolean;
}

export function checkLocalStorageValue<T>({ key, expectedValue, expectNotToExist }: CheckLocalStorageValueProps<T>) {
  const localStorageValue = window.localStorage.getItem(key);
  if (expectNotToExist) {
    expect(localStorageValue).toBeNull();
  } else {
    expect(localStorageValue).toEqual(expectedValue);
  }
}
