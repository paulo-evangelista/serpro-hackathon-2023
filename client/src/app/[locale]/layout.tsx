import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "pt"];

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
		console.log(locale);
		messages = require(`../../../messages/${locale}.json`);
	} catch (error) {
		console.log(locale);
		messages = require(`../../../messages/pt.json`);
	}

	return (
		<html lang={locale}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<body>{children}</body>
			</NextIntlClientProvider>
		</html>
	);
}
