import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import config from "src/config";
import { getJwtFromStorage } from "./repositories/jwt";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";

const httpLink = createHttpLink({
  uri: `${config.HASURA_BASE_URL}/v1/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const hasuraJwt = getJwtFromStorage();
  const authorizationHeaders = hasuraJwt ? { Authorization: `Bearer ${hasuraJwt.accessToken}` } : {};
  return {
    headers: {
      ...headers,
      ...authorizationHeaders,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
