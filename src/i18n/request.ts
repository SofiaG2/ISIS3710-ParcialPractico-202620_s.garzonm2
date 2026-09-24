import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale = requestedLocale === "en" ? "en" : "es";
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});