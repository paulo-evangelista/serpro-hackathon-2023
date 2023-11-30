"use client";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import InvestmentCard from "../../components/InvestmentCard";
import { Navbar } from "../../components/Navbar";
import InvestmentGoals from "../../components/InvesmentGoals";
import { Link } from "@/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Home({
	params: { locale },
}: {
	params: { locale: string };
}) {
	unstable_setRequestLocale(locale);

	let [lastUpdatedTime, setLastUpdatedTime] = useState<string>(
		new Date().toLocaleString().replace(",", " 🕘")
	);

	const [titles, setTitles] = useState<any>([]);
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

	useEffect(() => {
		setLastUpdatedTime(new Date().toLocaleString().replace(",", " 🕘"));
	}, []);

	const t = useTranslations();

	return (
		<div>
			<Navbar />

			<div className="flex flex-1 flex-col px-4 md:px-0 min-h-screen pb-8">
				<div className="relative mt-[4.25rem]">
					<div className="w-full h-80 overflow-hidden">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://www.tesourodireto.com.br/data/files/7E/31/02/3D/25907810B0345668894D49A8/Banner-1.png"
							alt={t("Home.tr+.bannerAlt")}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-start px-32">
						<div className="flex flex-col">
							<h1 className="text-white text-4xl font-bold mb-2">
								{t("Home.tr+.title")}
							</h1>
							<p className="text-white mb-2">
								{t("Home.tr+.description")}
							</p>
							<button className="bg-green-700 text-md font-bold text-white px-6 py-3 rounded-full">
								{t("Home.tr+.button")}
							</button>
						</div>
					</div>
				</div>
				<div className="bg-gray-100 pt-10 pb-10">
					<Graph />
				</div>
				<div>
					<InvestmentGoals />
				</div>
				<div className="bg-indigo-900 ">
					<div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 bt-16 pt-20 pb-20">
						{titles.map(
							(
								title: {
									name: string;
									percentageReturnPerYear: string;
									deadline: string;
								},
								index: number
							) => {
								return (
									<InvestmentCard
										key={index}
										title={title.name}
										yieldAnnual={
											title.percentageReturnPerYear
										}
										dueDate={title.deadline}
									/>
								);
							}
						)}
					</div>
				</div>

				<div className="w-full md:w-2/3 max-w-screen-xl mx-auto px-2 mt-4">
					<h1 className="text-4xl text-gray-700 font-semibold mb-8">
						{t("Title.checkProfitability")}
					</h1>

					{/* Availability */}
					<div className="border border-gray-600 rounded-md flex flex-col justify-center mb-8">
						<div className="flex flex-col sm:flex-row items-center justify-between p-4">
							<div className="flex items-center justify-center w-full sm:w-1/2 mb-4 sm:mb-0">
								<div className="bg-green-500 rounded-full w-2 h-2 mr-2"></div>
								<p className="text-gray-700 text-2xl">
									{t("Title.marketOpen")}
								</p>
							</div>

							<div className="mx-2 text-4xl text-gray-400 font-thin hidden sm:block">
								|
							</div>

							<div className="flex flex-col justify-center w-full sm:w-auto">
								<p className="text-gray-700">
									{t("Title.operatingHours")}
								</p>
								<p className="text-gray-700 text-lg font-semibold">
									{t("Title.serviceAvailability")}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="max-w-screen-xl mx-auto px-2 md:max-w-screen-xl w-full md:w-2/3">
					{/* Titles */}
					<div className="overflow-x-auto">
						<table className="table-auto w-full">
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
									titles.map((title: any, index: any) => (
										<tr key={index} className="border-b">
											<td className="px-4 py-2 text-center">
												{title.name}
											</td>
											<td className="px-4 py-2 text-center">
												{title.percentageReturnPerYear}
											</td>
											<td className="px-4 py-2 text-center">
												{title.price}
											</td>
											<td className="px-4 py-2 text-center">
												{title.deadline}
											</td>
											<td className="px-4 py-2 text-center">
												<Link
													href={`/titles/${title.id}`}
													className="bg-white border border-green-700 px-3 py-1 rounded text-green-700 hover:bg-green-700 hover:text-white transition duration-300"
												>
													{t("Title.invest")}
												</Link>
											</td>
										</tr>
									))}

								{titles.length < 1 && !isLoadingTitles && (
									<tr>
										<td
											colSpan={5}
											className="px-4 py-2 text-center"
										>
											{t("Title.noTitles")}
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
}
const Graph = () => {
	const [investment, setInvestment] = useState(1000000);
	const [years, setYears] = useState(20);

	const [savingsOutcome, setSavingsOutcome] = useState(3227448.53);
	const [treasuryOutcome, setTreasuryOutcome] = useState(5117696.74);

	const handleInvestmentChange = (e: any) => {
		const value = e.target.value.replace(/\D/g, "");
		setInvestment(Number(value));
		calculateOutcomes(Number(value), years);
	};

	const handleYearsChange = (e: any) => {
		const value = e.target.value;
		setYears(Number(value));
		calculateOutcomes(investment, Number(value));
	};

	const calculateOutcomes = (amount: any, duration: any) => {
		const savingsInterestRate = 0.05;
		const treasuryInterestRate = 0.1;

		const savings = amount * Math.pow(1 + savingsInterestRate, duration);
		const treasury = amount * Math.pow(1 + treasuryInterestRate, duration);

		setSavingsOutcome(savings);
		setTreasuryOutcome(treasury);
	};

	const t = useTranslations();

	return (
		<div className="p-10 flex flex-col lg:flex-row">
			<div className="max-w-2xl mx-auto lg:mr-10 lg:w-1/2">
				<h1 className="text-2xl font-bold mb-6">
					{t("Home.tr+.simulateInvestment")}
				</h1>
				<p className="mb-4">{t("Home.tr+.investmentAdvantages")}</p>

				<div className="flex flex-col space-y-4 mb-8">
					<label htmlFor="amount">{t("Home.tr+.iHave")}</label>
					<input
						id="amount"
						className="form-input mt-1 block w-full border-2 border-gray-200 p-2"
						type="text"
						onChange={handleInvestmentChange}
						maxLength={9}
						value={investment.toLocaleString("pt-BR")}
					/>
					<label htmlFor="years">{t("Home.tr+.toApplyFor")}</label>
					<input
						id="years"
						className="form-input mt-1 block w-full border-2 border-gray-200 p-2"
						type="number"
						min={1}
						max={20}
						onChange={handleYearsChange}
						value={years}
					/>{" "}
					{t("Home.tr+.years")}
				</div>

				<button className="bg-green-700 text-lg font-bold  text-white px-4 py-2 rounded-full hover:bg-green-600">
					{t("Home.tr+.simulateMore")}
				</button>
				<p className="text-xs mt-4">
					{t("Home.tr+.projectionDisclaimer")}
				</p>
				<p className="text-xs">{t("Home.tr+.simulationDisclaimer")}</p>
			</div>

			<div className="max-w-2xl mx-auto lg:w-1/2">
				<div className="flex justify-around mb-4">
					<div className="text-center flex flex-col justify-center items-center">
						<div
							className="bg-blue-500 w-24"
							style={{
								height: `${savingsOutcome / 15000}px`,
								transform: "scaleY(-1)",
                            maxHeight: `750px`
							}}
						></div>
						<p className="mt-2">{t("Home.tr+.savings")}</p>
						<p className="font-bold">
							{savingsOutcome.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</p>
					</div>
					<div className="text-center flex flex-col justify-center items-center">
						<div
							className="bg-teal-500 w-24"
							style={{
								height: `${treasuryOutcome / 15000}px`,
								transform: "scaleY(-1)",
								maxHeight: `1000px`
							}}
						></div>

						<p className="mt-2">{t("Home.tr+.treasuryIPCA")}</p>
						<p className="font-bold">
							{treasuryOutcome.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
