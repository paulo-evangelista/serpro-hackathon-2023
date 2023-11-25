"use client";
import Link from "next/link";
import { useMetamask } from "../hooks/useMetamask";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useState } from "react";
import Image from "next/image";
import menu from "@/app/assets/menu.svg";
import xIcon from "@/app/assets/x.svg";
import { useAuth } from "../context";

export const Navbar = () => {
	const { account } = useAuth();

	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 bg-black transition-opacity ${
					isOpen ? "opacity-50 z-10" : "opacity-0"
				} duration-700 ease-in-out md:hidden`}
			></div>

			{/* Sidebar menu */}
			<div
				className={`bg-[#26336a] text-[#f1f1f1] flex flex-col absolute top-0 left-0 px-2 py-4 w-2/3  ${
					isOpen ? "h-screen flex z-20" : "hidden"
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
					<Link href={"/home"} className="px-2">
						Home
					</Link>
					<Link href={"/about"} className="px-2">
						Sobre
					</Link>
					<Link href={"/contact"} className="px-2">
						Contato
					</Link>
				</div>
			</div>

			{/* Navbar */}
			<div className="bg-[#26336a] text-[#f1f1f1] flex flex-1 absolute top-0 items-center left-0 px-2 py-4 w-full justify-between">
				<div className="flex w-auto md:w-1/3 border-2 border-red-500 items-center justify-start">
					<button
						onClick={handleClick}
						className={`flex flex-col justify-center items-center ${
							isOpen ? "rotate-180" : ""
						} transition duration-700 ease-in-out mr-2`}
					>
						<Image src={menu} width={24} height={24} alt="menu" />
					</button>

					<Link href={"/"}>
						<p className="text-2xl">Tesouro Direto</p>
					</Link>
				</div>

				<div className="hidden md:flex w-auto md:w-1/3 border-2 border-red-500 items-center justify-center">
					<ul className="flex flex-row">
						<Link href={"/home"} className="px-2">
							Home
						</Link>
						<Link href={"/about"} className="px-2">
							Sobre
						</Link>
						<Link href={"/contact"} className="px-2">
							Contato
						</Link>
					</ul>
				</div>

				{account ? (
					<div className="flex w-auto items-center md:w-1/3 border-2 border-red-500 items-center justify-end">
						<Link href={"/profile"}>
							<div className="flex items-center">
								<Jazzicon
									diameter={32}
									seed={jsNumberForAddress(account)}
								/>
							</div>
						</Link>
					</div>
				) : (
					<div className="flex w-auto md:w-1/3 items-end border-2 border-red-500 items-center justify-end">
						<button className="bg-[#f1f1f1] text-[#26336a] px-4 py-2 rounded-md">
							Login
						</button>
					</div>
				)}
			</div>
		</>
	);
};
