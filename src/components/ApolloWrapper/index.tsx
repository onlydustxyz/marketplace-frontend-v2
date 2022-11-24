import { PropsWithChildren } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import config from "src/config";
import { useAuth } from "src/hooks/useAuth";

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { getToken } = useAuth();

  const AuthenticationLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    const authorizationHeaders = token ? { Authorization: `Bearer ${token.accessToken}` } : {};
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

  const client = new ApolloClient({
    link: ApolloLink.from([AuthenticationLink, HttpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
