"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./[locale]/context";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

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
