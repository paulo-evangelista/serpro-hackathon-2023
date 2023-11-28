"use client";
import Link from "next/link";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useEffect, useState } from "react";
import Image from "next/image";
import menu from "@/app/assets/menu.svg";
import xIcon from "@/app/assets/x.svg";
import tIcon from "@/app/assets/td.svg";
import { useAuth } from "../context";

export const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const { account, logout }: any = useAuth();

	const handleClick = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		console.log(account);
	}, [account]);

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 bg-black transition-opacity ${
					isSidebarOpen ? "opacity-50 z-10" : "opacity-0"
				} duration-700 ease-in-out md:hidden`}
			></div>

			{/* Sidebar menu */}
			<div
				className={`bg-[#26336a] text-[#f1f1f1] flex flex-col absolute top-0 left-0 px-2 py-4 w-2/3  ${
					isSidebarOpen ? "h-screen flex z-20" : "hidden"
				} transition duration-1000 ease-in-out md:hidden`}
			>
				<div className="flex mb-4">
					<button
						onClick={handleClick}
						className="flex flex-col justify-center items-center mr-2 transition duration-700 ease-in-out"
					>
						<Image src={xIcon} width={24} height={24} alt="close" />
					</button>
					<Link href={"/"}>
						<p className="text-2xl">Tesouro Direto</p>
					</Link>
				</div>
				<div className="flex flex-col text-lg">
					<Link href={"/"} className="px-2">
						Home
					</Link>
					<Link href={"/titles"} className="px-2">
						Títulos
					</Link>
					<Link href={"/about"} className="px-2">
						Conheça
					</Link>
					<Link href={"/contact"} className="px-2">
						Contato
					</Link>
				</div>
			</div>

			{/* Navbar */}
			<div className="bg-[#26336a] text-[#f1f1f1] flex flex-1 absolute top-0 items-center left-0 px-2 py-4 w-full justify-between">
				<div className="flex w-auto md:w-1/3 items-center justify-start">
					<button
						onClick={handleClick}
						className={`flex flex-col justify-center items-center ${
							isOpen ? "rotate-180" : ""
						} transition duration-700 ease-in-out mr-2`}
					>
						<Image src={menu} width={24} height={24} alt="menu" />
					</button>
					<Link href={"/"} className="ml-4">
						{/* <p className="text-2xl">Tesouro Direto</p> */}
						<Image
							src={tIcon}
							width={200}
							height={200}
							alt="menu"
						/>
					</Link>
				</div>

				<div className="hidden md:flex w-auto md:w-1/3 items-center justify-center">
					<ul className="flex flex-row">
						<Link href={"/"} className="px-2">
							Home
						</Link>
						<Link href={"/titles"} className="px-2">
							Títulos
						</Link>
						<Link href={"/about"} className="px-2">
							Conheça
						</Link>
						<Link href={"/contact"} className="px-2">
							Contato
						</Link>
					</ul>
				</div>

				{account ? (
					<div className="relative flex justify-end w-1/3">
						<button onClick={() => setIsOpen(!isOpen)}>
							<Jazzicon
								diameter={32}
								seed={jsNumberForAddress(
									account.wallet || account.email
								)}
							/>
						</button>
						{isOpen && (
							<div className="absolute right-0 z-10 mt-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
								<div
									className="py-1"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="options-menu"
								>
									{account.wallet && (
										<div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											<p className="text-sm text-gray-700">
												{account.wallet.substring(
													0,
													6
												) +
													"..." +
													account.wallet.substring(
														account.wallet.length -
															4
													) || account.email}
											</p>
										</div>
									)}

									<Link
										href={"/profile"}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem"
									>
										Perfil
									</Link>

									{account.type == "company" && (
										<Link
											href={"/adm"}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											role="menuitem"
										>
											Sua empresa
										</Link>
									)}

									{account.type == "government" && (
										<Link
											href={"/adm"}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											role="menuitem"
										>
											Administração
										</Link>
									)}

									<button
										onClick={logout}
										className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
										role="menuitem"
									>
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<Link href={"/login"}>
						<button className="bg-green-700 text-white px-6 py-3 rounded-lg">
							Login
						</button>
					</Link>
				)}
			</div>
		</>
	);
};
