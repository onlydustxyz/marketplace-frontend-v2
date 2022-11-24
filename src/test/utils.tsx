import { PropsWithChildren } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { AuthProvider } from "src/hooks/useAuth";

interface MockedProviderProps {
  mocks?: MockedResponse<Record<string, unknown>>[];
}

export const MemoryRouterProviderFactory =
  ({ mocks }: MockedProviderProps) =>
  ({ children }: PropsWithChildren) =>
    (
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider>{children}</AuthProvider>
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
