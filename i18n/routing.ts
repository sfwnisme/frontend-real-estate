import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "ar",
  // "always" -> /locale
  // "as-needed" -> defaultLocale = /, en = /en
  // "never" -> all = /
  localePrefix: "as-needed",
  // true -> rely on browser accept-language header request.
  // false -> relys on user's cookies, also enble URL matching.
  localeDetection: false,
});
