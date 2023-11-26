"use client";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";

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
					<div className="flex items-center justify-start px-32">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://www.tesourodireto.com.br/data/files/7E/31/02/3D/25907810B0345668894D49A8/Banner-1.png"
							alt="Imagem de fundo"
							className="w-full h-full object-cover"
							width={1920}
							height={1080}
						/>
					</div>
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
			<div className="max-w-screen-xl mx-auto">
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
								<th className="px-4 py-2">Simular</th>
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
