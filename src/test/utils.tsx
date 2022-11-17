import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import { MockedProvider } from "@apollo/client/testing";

interface MemoryRouterProviderFactoryProps {
  route: string;
  mocks: any;
}

export const MemoryRouterProviderFactory =
  ({ route, mocks }: MemoryRouterProviderFactoryProps) =>
  ({ children }: PropsWithChildren) =>
    (
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </MockedProvider>
    );

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
