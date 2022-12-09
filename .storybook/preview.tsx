import "tailwindcss/tailwind.css";
import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import en from "src/translations/en.json";
import { Talkr } from "talkr";
import React from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <Talkr languages={{ en }} defaultLanguage="en">
      <Story />
    </Talkr>
  ),
];
