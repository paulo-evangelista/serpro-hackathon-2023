"use client";
import axios from "axios";
import React from "react";
import { Navbar } from "../../../components/Navbar";
import { useState, useEffect } from "react";
import { Footer } from "../../../components/Footer";
import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

interface TitleModel {
	id: number;
	name: string;
	ipfsImageURI: string;
	total_supply: number;
	available_supply: number;
	price: number;
	interest: number;
	deadline: number;
	address: string;
	created_at: string;
}

const Title = ({ params: { locale } }: { params: { locale: string } }) => {
	unstable_setRequestLocale(locale);

	const [titles, setTitles] = useState<TitleModel[] | []>([]);
	const [isLoadingTitles, setIsLoadingTitles] = useState<boolean>(true);

	const getTitles = async () => {
		setIsLoadingTitles(true);

		const path = "http://localhost:3050/platform/getAllAssets";

		try {
			await axios
				.get(path, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res: { data: any }) => {
					setTitles(res.data);
					return res.data;
				})
				.catch((err: any) => {
					return err;
				});
		} catch (error) {
			console.error("Error during signup: ", error);
			throw error;
		} finally {
			setIsLoadingTitles(false);
		}
	};

	useEffect(() => {
		getTitles();
	}, []);

	const t = useTranslations("Title");

	return (
		<div>
			<Navbar />
			<div className="flex flex-1 flex-col min-h-screen mt-16">
				<div className="relative mt-1 mb-10 ">
					<div className="w-full h-80 overflow-hidden">
						{/* <img
							src="https://www.tesourodireto.com.br/data/files/8B/75/DD/0C/63D4D710C0F1C0D7894D49A8/banner-acessibilidade-precos-taxas.png"
							alt={t("backgroundImageAlt")}
							className="w-full h-full object-cover"
						/> */}
						<Image
							src="https://www.tesourodireto.com.br/data/files/8B/75/DD/0C/63D4D710C0F1C0D7894D49A8/banner-acessibilidade-precos-taxas.png"
							alt={t("backgroundImageAlt")}
							quality={100}
							className="w-full h-full object-cover"
							width={200}
							height={200}
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-start px-32">
						<h1 className="text-white text-4xl font-bold text-center">
							{t("chooseAndInvest")}
						</h1>
					</div>
				</div>

				<div className="w-full md:w-4/5 mx-auto px-2">
					<h1 className="text-4xl text-gray-700 font-semibold mb-8">
						{t("checkProfitability")}
					</h1>

					{/* Availability */}
					<div className="border border-gray-600 rounded-md flex flex-col justify-center mb-8">
						<div className="flex flex-col sm:flex-row items-center justify-between p-4">
							<div className="flex items-center justify-center w-full sm:w-1/2 mb-4 sm:mb-0">
								<div className="bg-green-500 rounded-full w-2 h-2 mr-2"></div>
								<p className="text-gray-700 text-2xl">
									{t("marketOpen")}
								</p>
							</div>

							<div className="mx-2 text-4xl text-gray-400 font-thin hidden sm:block">
								|
							</div>

							<div className="flex flex-col justify-center w-full sm:w-auto">
								<p className="text-gray-700">
									{t("operatingHours")}
								</p>
								<p className="text-gray-700 text-lg font-semibold">
									{t("serviceAvailability")}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mx-auto px-2  w-full md:w-4/5">
					{/* Titles */}
					<div className="overflow-x-auto">
						<table className="table-auto w-full border rounded-lg">
							{/* Table Head and Body */}

							<thead>
								<tr className="bg-gray-200">
									<th className="px-4 py-2">Título</th>
									<th className="px-4 py-2">Rentabilidade</th>
									<th className="px-4 py-2">
										Preço unitário
									</th>
									<th className="px-4 py-2">Vencimento</th>
									<th className="px-4 py-2">Investir</th>
								</tr>
							</thead>
							<tbody>
								{titles &&
									titles.length > 0 &&
									titles.map(
										(title: TitleModel, index: any) => (
											<tr
												key={index}
												className="border-b"
											>
												<td className="px-4 py-2 text-center">
													{title.name || "-"}
												</td>
												<td className="px-4 py-2 text-center">
													{title.interest / 100 ||
														"-"}
													%
												</td>
												<td className="px-4 py-2 text-center text-sm">
													R$ / DREX{" "}
													<span className="text-xl">
														{title.price || "-"}
													</span>
												</td>
												<td className="px-4 py-2 text-center">
													{new Date(
														title.deadline
													).toDateString() || "-"}
												</td>
												<td className="px-4 py-2 text-center">
													<Link
														href={`/titles/${title.id}`}
														className="bg-white border border-green-700 px-3 py-1 rounded text-green-700 hover:bg-green-700 hover:text-white transition duration-300"
													>
														{t("invest")}
													</Link>
												</td>
											</tr>
										)
									)}

								{titles.length < 1 && !isLoadingTitles && (
									<tr>
										<td
											colSpan={5}
											className="px-4 py-2 text-center"
										>
											{t("noTitles")}
										</td>
									</tr>
								)}

								{isLoadingTitles && (
									<tr>
										<td
											colSpan={5}
											className="px-4 py-2 text-center"
										>
											<svg
												className="animate-spin h-5 w-5 mr-3 text-center"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												/>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
												/>
											</svg>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Title;
