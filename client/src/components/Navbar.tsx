"use client";
import { Link as IntlLink, usePathname } from "@/navigation";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useEffect, useState } from "react";
import Image from "next/image";
import menu from "@/assets/menu.svg";
import xIcon from "@/assets/x.svg";
import tIcon from "@/assets/td.svg";
import { useAuth } from "../context";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const locales = ["en", "pt-br"];

export const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isIdiomOpen, setIsIdiomOpen] = useState(false);

	const { account, logout }: any = useAuth();

	const handleClick = () => {
		setIsSidebarOpen((prevState) => !prevState);
		setIsIdiomOpen(false);
		setIsOpen(false);
	};

	const handleIdiomClick = () => {
		setIsIdiomOpen((prevState) => !prevState);
		setIsSidebarOpen(false);
		setIsOpen(false);
	};

	const handleLoginClick = () => {
		setIsOpen((prevState) => !prevState);
		setIsSidebarOpen(false);
		setIsIdiomOpen(false);
	};

	const t = useTranslations("Navbar");

	const pathname = usePathname();
	const locale = useLocale();

	const [sidebarItems, setSidebarItems] = useState([
		{ path: "/", name: t("home") },
		{ path: "/titles", name: t("titles") },
		{ path: "/about", name: t("learnMore") },
		{ path: "/contact", name: t("contact") },
		{ path: "/profile", name: t("profile") },
	]);
	let accountType = localStorage.getItem("accountType");

	useEffect(() => {
		accountType = localStorage.getItem("accountType");
		if (accountType == "company") {
			setSidebarItems([
				...sidebarItems,
				{ path: "/adm", name: t("yourCompany") },
			]);
		}
	}, [account]);

	return (
		<>
			{/* Sidebar menu */}
			{isSidebarOpen && (
				<>
					<div
						onClick={handleClick}
						className="fixed inset-0 bg-black transition-opacity opacity-50 z-10 duration-700 ease-in-out"
					></div>
					<div className="absolute top-0 left-0 bg-[#26336a] text-[#f1f1f1] flex-col px-2 py-4 w-2/3 min-h-screen h-full flex z-10 transition duration-1000 ease-in-out">
						<div className="flex mb-6 px-2 py-4 border-b border-[#f1f1f140]">
							<button
								onClick={handleClick}
								className="flex flex-col justify-center items-center mr-2 transition duration-700 ease-in-out"
							>
								<Image
									src={xIcon}
									width={24}
									height={24}
									alt={t("closeIconAlt")}
								/>
							</button>
							<IntlLink href={"/"}>
								<Image
									src={tIcon}
									width={200}
									height={200}
									alt={t("logoAlt")}
								/>
							</IntlLink>
						</div>
						<div className="flex flex-col text-lg justify-between h-full">
							<div className="flex flex-col">
								{sidebarItems.map((item, index) => (
									<IntlLink
										key={index}
										href={item.path}
										className={
											"px-2 hover:text-gray-400 transition duration-200 ease-in-out" +
											(index == sidebarItems.length - 1
												? " mb-0"
												: " mb-2") +
											(pathname == item.path
												? " underline"
												: "")
										}
									>
										{item.name}
									</IntlLink>
								))}
							</div>

							<div className="flex items-end justify-end">
								<button
									className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition duration-200 ease-in-out w-fit"
									onClick={logout}
								>
									{t("logout")}
								</button>
							</div>
						</div>
					</div>
				</>
			)}

			{/* Navbar */}
			<div className="bg-[#26336a] text-[#f1f1f1] flex flex-1 absolute top-0 items-center left-0 px-2 py-4 w-full justify-between">
				<div className="flex w-auto md:w-1/3 items-center justify-start">
					<button
						onClick={handleClick}
						className={`flex flex-col justify-center items-center ${
							isOpen ? "rotate-180" : ""
						} transition duration-700 ease-in-out mr-2`}
					>
						<Image
							src={menu}
							width={24}
							height={24}
							alt={t("menuIconAlt")}
						/>
					</button>
					<IntlLink href={"/"} className="ml-4">
						<Image
							src={tIcon}
							width={200}
							height={200}
							alt={t("logoAlt")}
						/>
					</IntlLink>
				</div>

				<div className="hidden md:flex w-auto md:w-1/3 items-center justify-center">
					<ul className="flex flex-row">
						<IntlLink
							href={"/"}
							className="px-2 hover:text-gray-400 transition duration-200 ease-in-out"
						>
							{t("home")}
						</IntlLink>
						<IntlLink
							href={"/titles"}
							className="px-2 hover:text-gray-400 transition duration-200 ease-in-out"
						>
							{t("titles")}
						</IntlLink>
						<IntlLink
							href={"/about"}
							className="px-2 hover:text-gray-400 transition duration-200 ease-in-out"
						>
							{t("learnMore")}
						</IntlLink>
						<IntlLink
							href={"/contact"}
							className="px-2 hover:text-gray-400 transition duration-200 ease-in-out"
						>
							{t("contact")}
						</IntlLink>
					</ul>
				</div>

				<div className="relative flex justify-end w-1/3">
					<button
						className="flex justify-center items-center mr-4"
						onClick={handleIdiomClick}
					>
						<span className="text-xl md:text-2xl">
							{locale.toUpperCase() == "EN"
								? "🇺🇸"
								: locale.toUpperCase() == "PT-BR"
								? "🇧🇷"
								: "🌎"}
						</span>
					</button>
					{isIdiomOpen && (
						<div className="absolute right-0 top-2 z-10 mt-8 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
							<div
								className="py-1"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="options-menu"
							>
								{locales.map(
									(locale: string, index: number) => (
										<Link
											key={index}
											href={`/${locale}/${pathname}`}
											locale={locale}
											className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
										>
											{locale == "en"
												? "🇺🇸"
												: locale == "pt-br"
												? "🇧🇷"
												: "🌎"}
											{locale.toUpperCase()}{" "}
										</Link>
									)
								)}
							</div>
						</div>
					)}

					{account && (
						<button onClick={handleLoginClick}>
							<Jazzicon
								diameter={32}
								seed={jsNumberForAddress(
									account.wallet || account.email
								)}
							/>
						</button>
					)}

					{!account && (
						<IntlLink href={"/login"}>
							<button className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out">
								{t("login")}
							</button>
						</IntlLink>
					)}

					{isOpen && (
						<div className="absolute right-0 z-10 mt-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
							<div
								className="py-1"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="options-menu"
							>
								{account && account.wallet && (
									<div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										<p className="text-sm text-gray-700">
											{account.wallet.substring(0, 6) +
												"..." +
												account.wallet.substring(
													account.wallet.length - 4
												) || account.email}
										</p>
									</div>
								)}

								<IntlLink
									href={"/profile"}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem"
								>
									{t("profile")}
								</IntlLink>

								{accountType == "company" && (
									<IntlLink
										href={"/adm"}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem"
									>
										{t("yourCompany")}
									</IntlLink>
								)}

								{accountType == "government" && (
									<IntlLink
										href={"/adm"}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem"
									>
										{t("administration")}
									</IntlLink>
								)}

								<button
									onClick={logout}
									className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
									role="menuitem"
								>
									{t("logout")}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
