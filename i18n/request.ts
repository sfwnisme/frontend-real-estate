import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Static form now, we'll change this later
  const cookieStore = await cookies()
  const locale = cookieStore.get("locale")?.value || "en"

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
