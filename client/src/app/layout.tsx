import { Inter } from "next/font/google";
import { AuthProvider } from "./[locale]/context";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tesouro Direto",
	description: "Tesouro Direto",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<AuthProvider>
				<body className={inter.className + " min-h-screen"}>
					{children}
				</body>
			</AuthProvider>
			<ToastContainer />
		</html>
	);
}
