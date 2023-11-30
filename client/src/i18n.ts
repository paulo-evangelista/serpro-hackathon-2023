import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
	messages: await import(`../messages/${locale}.json`),
	timeZone: "America/Sao_Paulo",
	now: new Date(),
	onError: (error) => {
		console.error(error);
	},
}));
