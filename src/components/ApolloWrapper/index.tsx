import { PropsWithChildren } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  Operation,
  NextLink,
  Observable,
  FetchResult,
} from "@apollo/client";
import { deepCamelCase } from "src/utils/deepCamelCase";
import { setContext } from "@apollo/client/link/context";
import config from "src/config";
import { useAuth } from "src/hooks/useAuth";

export const buildApolloCache = () => new InMemoryCache();

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { getUpToDateHasuraToken } = useAuth();

  const AuthenticationLink = setContext(async (_, { headers }) => {
    const hasuraToken = await getUpToDateHasuraToken();
    const authorizationHeaders = hasuraToken ? { Authorization: `Bearer ${hasuraToken.accessToken}` } : {};
    return {
      headers: {
        ...headers,
        ...authorizationHeaders,
      },
    };
  });

  const HttpLink = createHttpLink({
    uri: `${config.HASURA_BASE_URL}/v1/graphql`,
  });

  const AntiCorruptionLink = new ApolloLink((operation: Operation, forward: NextLink): Observable<FetchResult> => {
    const response = forward(operation);
    return response.map(deepCamelCase);
  });

  const client = new ApolloClient({
    link: ApolloLink.from([AuthenticationLink, AntiCorruptionLink, HttpLink]),
    cache: buildApolloCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
