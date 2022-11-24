import React from "react";
import ReactDOM from "react-dom/client";
import ApolloWrapper from "src/components/ApolloWrapper";
import { AuthProvider } from "src/hooks/useAuth";
import App from "./App";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import { createAppRouter } from "./routes";

const router = createAppRouter();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloWrapper>
        <App router={router} />
      </ApolloWrapper>
    </AuthProvider>
  </React.StrictMode>
);
