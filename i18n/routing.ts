import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "ar",
  // "always" -> /locale
  // "as-needed" -> defaultLocale = /, en = /en
  // "never" -> all = /
  localePrefix: "as-needed",
});
