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
  expectedIncludedObject?: Record<string, unknown>;
}

export function checkLocalStorageValue<T>({
  key,
  expectedValue,
  expectedIncludedObject,
  expectNotToExist,
}: CheckLocalStorageValueProps<T>) {
  const localStorageValue = window.localStorage.getItem(key);
  if (expectNotToExist) {
    expect(localStorageValue).toBeNull();
  } else if (expectedIncludedObject) {
    const parsedObject = JSON.parse(localStorageValue ?? "");
    expect(parsedObject).toMatchObject(expectedIncludedObject);
  } else {
    expect(localStorageValue).toEqual(expectedValue);
  }
}
