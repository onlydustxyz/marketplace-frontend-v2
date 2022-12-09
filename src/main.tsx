import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ApolloWrapper from "src/components/ApolloWrapper";
import { AuthProvider } from "src/hooks/useAuth";
import { Talkr } from "talkr";
import App from "./App";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import en from "./translations/en.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Talkr languages={{ en }} defaultLanguage="en">
      <BrowserRouter>
        <AuthProvider>
          <ApolloWrapper>
            <App />
          </ApolloWrapper>
        </AuthProvider>
      </BrowserRouter>
    </Talkr>
  </React.StrictMode>
);
