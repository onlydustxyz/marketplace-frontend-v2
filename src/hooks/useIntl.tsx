import { PropsWithChildren } from "react";
import { IntlProvider as IntlProvider_, PrimitiveType, useIntl } from "react-intl";
import * as englishTranslations from "../translations/en.json";

export type LocaleMessages = typeof englishTranslations;
export type LocaleKey = keyof LocaleMessages;

export const IntlProvider = ({ children }: PropsWithChildren) => (
  <IntlProvider_ locale="en" messages={englishTranslations}>
    {children}
  </IntlProvider_>
);

export const useFormatMessage: () => (
  id: LocaleKey, // only accepts valid keys, not any string
  values?: Record<string, PrimitiveType>
) => string = () => {
  const intl = useIntl();
  return (id, values) => intl.formatMessage({ id }, values);
};
