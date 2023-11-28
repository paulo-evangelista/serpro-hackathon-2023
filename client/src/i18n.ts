import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
	messages: (await import(`../messages/${locale}.json`)).default,
	defaultLocale: "en",
	timeZone: "America/Sao_Paulo",
}));
