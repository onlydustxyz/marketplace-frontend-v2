import React, { PropsWithChildren, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider, useAuth } from "src/hooks/useAuth";

import App from "./App";
import config from "src/config";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { getToken } = useAuth();
  const token = getToken();

  const authLink = setContext((_, { headers }) => {
    const authorizationHeaders = token ? { Authorization: `Bearer ${token.accessToken}` } : {};
    return {
      headers: {
        ...headers,
        ...authorizationHeaders,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: `${config.HASURA_BASE_URL}/v1/graphql`,
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApolloWrapper>
          <App />
        </ApolloWrapper>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
