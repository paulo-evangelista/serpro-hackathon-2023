"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Footer } from "./components/Footer";
import InvestmentCard from "./components/InvestmentCard";
import { Navbar } from "./components/Navbar";

export default function Home() {
	let [lastUpdatedTime, setLastUpdatedTime] = useState<string>(
		new Date().toLocaleString().replace(",", " 🕘")
	);
 
	const [titles, setTitles] = useState([
		{
			name: "TESOURO PREFIXADO 2026",
			profitability: "10,24%",
			minimumInvestment: "R$ 32,57",
			unitPrice: "R$ 814,30",
			dueDate: "01/01/2026",
		},
		{
			name: "TESOURO PREFIXADO 2029",
			profitability: "10,86%",
			minimumInvestment: "R$ 35,52",
			unitPrice: "R$ 592,09",
			dueDate: "01/01/2029",
		},
		{
			name: "TESOURO PREFIXADO com juros semestrais 2033",
			profitability: "11,06%",
			minimumInvestment: "R$ 39,30",
			unitPrice: "R$ 982,70",
			dueDate: "01/01/2033",
		},
		{
			name: "TESOURO SELIC 2026",
			profitability: "SELIC + 0,0431%",
			minimumInvestment: "R$ 141,09",
			unitPrice: "R$ 14.109,77",
			dueDate: "01/03/2026",
		},
		{
			name: "TESOURO SELIC 2029",
			profitability: "SELIC + 0,1707%",
			minimumInvestment: "R$ 139,97",
			unitPrice: "R$ 13.997,82",
			dueDate: "01/03/2029",
		},
		{
			name: "TESOURO IPCA+ 2029",
			profitability: "IPCA + 5,50%",
			minimumInvestment: "R$ 31,11",
			unitPrice: "R$ 3.111,67",
			dueDate: "15/05/2029",
		},
		{
			name: "TESOURO IPCA+ 2035",
			profitability: "IPCA + 5,64%",
			minimumInvestment: "R$ 44,49",
			unitPrice: "R$ 2.224,67",
			dueDate: "15/05/2035",
		},
		{
			name: "TESOURO IPCA+ 2045",
			profitability: "IPCA + 5,77%",
			minimumInvestment: "R$ 37,61",
			unitPrice: "R$ 1.253,75",
			dueDate: "15/05/2045",
		},
	]);

	useEffect(() => {
		const interval = setInterval(() => {
			let date = new Date().toLocaleString().replace(",", " 🕘");
			setLastUpdatedTime(date);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<Navbar />
			<div className="relative mt-20 mb-10">
				<div className="w-full h-80 overflow-hidden">
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
						<button className="bg-green-700 text-white px-6 py-3 rounded-lg">
							Conheça o RendA+ e comece a investir
						</button>
					</div>
				</div>
			</div>

			<Graph />

			<div className="max-w-screen-xl mx-auto mb-8">
				<div className="flex mb-16 bt-16">
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
								Nossos serviços estão disponíveis 24 horas por
								dia, 7 dias por semana.
							</p>
						</div>
						<div className="flex justify-center">
							<p className="text-gray-700 font-semibold text-center">
								Ultima atualização:{" "}
								<span className="text-gray-700 font-normal">
									{lastUpdatedTime}
								</span>
							</p>
						</div>
					</div>
				</div>
				{/* Titles */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full">
						<thead>
							<tr className="bg-gray-200">
								<th className="px-4 py-2">Título</th>
								<th className="px-4 py-2">Rentabilidade</th>
								<th className="px-4 py-2">
									Investimento mínimo
								</th>
								<th className="px-4 py-2">Preço unitário</th>
								<th className="px-4 py-2">Vencimento</th>
								<th className="px-4 py-2"></th>
							</tr>
						</thead>
						<tbody>
							{titles.map((title, index) => (
								<tr key={index} className="border-b">
									<td className="px-4 py-2">{title.name}</td>
									<td className="px-4 py-2">
										{title.profitability}
									</td>
									<td className="px-4 py-2">
										{title.minimumInvestment}
									</td>
									<td className="px-4 py-2">
										{title.unitPrice}
									</td>
									<td className="px-4 py-2">
										{title.dueDate}
									</td>
									<td className="px-4 py-2">
										<button className="bg-white border border-green-700 px-3 py-1 rounded text-green-700 hover:bg-green-700 hover:text-white transition duration-300">
											Simular
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
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
		<div className="p-10">
			<div className="max-w-2xl mx-auto">
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

				<div className="flex justify-around mb-4">
					<div className="text-center">
						<div
							className="bg-blue-500 w-24"
							style={{ height: `${savingsOutcome / 15000}px` }}
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
							style={{ height: `${treasuryOutcome / 15000}px` }}
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

				<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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
		</div>
	);
};
