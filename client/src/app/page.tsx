"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Footer } from "./components/Footer";
import InvestmentCard from "./components/InvestmentCard";
import { Navbar } from "./components/Navbar";
import InvestmentGoals from "./components/InvesmentGoals";
import Link from "next/link";
import axios from "axios";

export default function Home() {
	let [lastUpdatedTime, setLastUpdatedTime] = useState<string>(
		new Date().toLocaleString().replace(",", " 🕘")
	);

	const [titles, setTitles] = useState<any>([]);
	const [authenticated, setAuthenticated] = useState<boolean>(false);

	const getTitles = async () => {
		const account = localStorage.getItem("account");
		let jwt = "";
		if (account) {
			jwt = JSON.parse(account).jwt;
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
			return;
		}

		const path = "http://localhost:3050/government/getAllAssets";

		try {
			await axios
				.get(path, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
				})
				.then((res: { data: any }) => {
					console.log(res.data);
					setTitles(res.data);
					return res.data;
				})
				.catch((err: any) => {
					return err;
				});
		} catch (error) {
			console.error("Error during signup: ", error);
			throw error;
		}
	}

    useEffect(() => {
		getTitles().then((res: any) => {
			setTitles(res.data);
		}
	)}, []);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		let date = new Date().toLocaleString().replace(",", " 🕘");
	// 		setLastUpdatedTime(date);
	// 	}, 5 * 60 * 1000 /* 5 minutes */);

	// 	() => clearInterval(interval);
	// }, [lastUpdatedTime]);

	useEffect(() => {
		setLastUpdatedTime(new Date().toLocaleString().replace(",", " 🕘"));
	}, []);

	return (
		<div>
			<Navbar />

			<div className="flex flex-1 flex-col px-4 md:px-0">
				<div className="relative mt-16">
					<div className="w-full h-80 overflow-hidden">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://www.tesourodireto.com.br/data/files/7E/31/02/3D/25907810B0345668894D49A8/Banner-1.png"
							alt="Imagem de fundo"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-start px-32">
						<div className="flex flex-col">
							<h1 className="text-white text-4xl font-bold mb-2">
								Tesouro RendA+
							</h1>
							<p className="text-white mb-2">
								Planeje a sua aposentadoria com o novo título do
								Tesouro Direto
							</p>
							<button className="bg-green-700 text-md font-bold text-white px-6 py-3 rounded-full">
								Conheça o RendA+ e comece a investir
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
						<InvestmentCard
							title={"TESOURO PREFIXADO 2026"}
							yieldAnnual={"11%"}
							dueDate={"01/01/2026"}
						/>
						<InvestmentCard
							title={"TESOURO PREFIXADO 2026"}
							yieldAnnual={"11%"}
							dueDate={"01/01/2026"}
						/>
						<InvestmentCard
							title={"TESOURO PREFIXADO 2026"}
							yieldAnnual={"11%"}
							dueDate={"01/01/2026"}
						/>
						<InvestmentCard
							title={"TESOURO PREFIXADO 2026"}
							yieldAnnual={"11%"}
							dueDate={"01/01/2026"}
						/>
					</div>
				</div>
				<div className="max-w-screen-xl mx-auto mt-8">
					<h1 className="text-4xl text-gray-700 font-semibold mb-8">
						Confira a rentabilidade de cada título
					</h1>

					{/* Availability */}
					<div className="border border-gray-600 rounded-md flex flex-col justify-center mb-8">
						<div className="flex items-center justify-between p-4">
							<div className="flex items-center justify-center w-1/2">
								{/* small green ball */}
								<div className="bg-green-500 rounded-full w-2 h-2 mr-2"></div>
								<p className="text-gray-700 text-2xl">
									Mercado Aberto
								</p>
							</div>

							<div className="mx-2 text-4xl text-gray-400 font-thin">
								|
							</div>

							<div className="flex flex-col justify-center">
								<p className="text-gray-700">
									Horario de funcionamento:
								</p>
								<p className="text-gray-700 text-lg font-semibold">
									Nossos serviços estão disponíveis 24 horas
									por dia, 7 dias por semana.
								</p>
							</div>
							<div className="flex justify-center">
								<p className="text-gray-700 font-semibold text-center">
									Ultima atualização:{" "}
									<span
										className="text-gray-700 font-normal"
										suppressHydrationWarning
									>
										{lastUpdatedTime}
									</span>
								</p>
							</div>
						</div>
					</div>
					{/* Titles */}
					{authenticated ? (
						<div className="overflow-x-auto">
							<table className="table-auto w-full mb-16">
								<thead>
									<tr className="bg-gray-200">
										<th className="px-4 py-2">Título</th>
										<th className="px-4 py-2">Rentabilidade</th>
										<th className="px-4 py-2">Preço unitário</th>
										<th className="px-4 py-2">Vencimento</th>
										<th className="px-4 py-2">Investir</th>
									</tr>
								</thead>
								<tbody>
									{titles && titles.map((title: any, index: number) => (
										<tr key={index} className="border-b">
											<td className="px-4 py-2 text-center">{title.name}</td>
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
													Investir
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="text-center text-red-500 mb-16">
							Efetue login para ver a rentabilidade dos títulos
						</p>
					)}
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

	return (
		<div className="p-10 flex flex-col lg:flex-row">
			<div className="max-w-2xl mx-auto lg:mr-10 lg:w-1/2">
				<h1 className="text-2xl font-bold mb-6">
					SIMULE SEU INVESTIMENTO
				</h1>
				<p className="mb-4">
					Compare e confira as vantagens de investir seu dinheiro no
					Tesouro Direto.
				</p>

				<div className="flex flex-col space-y-4 mb-8">
					<label htmlFor="amount">Eu tenho R$</label>
					<input
						id="amount"
						className="form-input mt-1 block w-full border-2 border-gray-200 p-2"
						type="text"
						onChange={handleInvestmentChange}
						maxLength={9}
						value={investment.toLocaleString("pt-BR")}
					/>
					<label htmlFor="years">Para aplicar durante</label>
					<input
						id="years"
						className="form-input mt-1 block w-full border-2 border-gray-200 p-2"
						type="number"
						min={1}
						max={20}
						onChange={handleYearsChange}
						value={years}
					/>{" "}
					anos
				</div>

				<button className="bg-green-700 text-lg font-bold px-12 py-4 text-white px-4 py-2 rounded-full hover:bg-green-600">
					Simule mais opções
				</button>
				<p className="text-xs mt-4">
					*Projeção do valor líquido de resgate (após taxas e
					impostos).
				</p>
				<p className="text-xs">
					*As simulações são baseadas em projeções de mercado. Isso
					não garante resultados futuros.
				</p>
			</div>

			<div className="max-w-2xl mx-auto lg:w-1/2">
				<div className="flex justify-around mb-4">
					<div className="text-center">
						<div
							className="bg-blue-500 w-24"
							style={{
								height: `${savingsOutcome / 15000}px`,
								transform: "scaleY(-1)",
							}}
						></div>
						<p className="mt-2">POUPANÇA</p>
						<p className="font-bold">
							{savingsOutcome.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</p>
					</div>
					<div className="text-center">
						<div
							className="bg-teal-500 w-24"
							style={{
								height: `${treasuryOutcome / 15000}px`,
								transform: "scaleY(-1)",
							}}
						></div>

						<p className="mt-2">TESOURO IPCA+ 2045</p>
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
