import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "de"];

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	if (!locales.includes(locale as any)) notFound();

	unstable_setRequestLocale(locale);

	let messages;
	try {
		messages = require(`../../../messages/${locale}.json`);
	} catch (error) {
		messages = require(`../../../messages/en.json`);
	}

	return (
		<html lang={locale}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<body>{children}</body>
			</NextIntlClientProvider>
		</html>
	);
}
