import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import config from "src/config";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";

const client = new ApolloClient({
  uri: `${config.HASURA_BASE_URL}/v1/graphql`,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": config.HASURA_ADMIN_SECRET,
  },
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
