import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Error from "./500";

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const defaultLocale = useLocale();

	let messages;
	try {
		messages = (await import(`../../../messages/${locale}.json`)).default;
	} catch (error) {
		console.log(error);
		Error({ statusCode: 404 });
	}

	if (!locale) {
		console.log("Locale not found");
		locale = defaultLocale;
	}

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
