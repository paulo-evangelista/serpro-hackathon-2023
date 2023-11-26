import React from "react";

const InvestmentCard = ({
	title,
	yieldAnnual,
	dueDate,
}: {
	title: string;
	yieldAnnual: string;
	dueDate: string;
}) => {
	return (
		<div className="max-w-xm rounded overflow-hidden shadow-lg bg-white px-6 py-16 m-4">
			<div className="font-bold text-xl mb-2">{title}</div>
			<p className="text-gray-700 text-base mb-4">
				Rentabilidade anual: {yieldAnnual}
			</p>
			<p className="text-gray-700 text-base mb-6">
				Vencimento: {dueDate}
			</p>
			<button className="bg-green-700 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full">
				Simule o investimento
			</button>
		</div>
	);
};

const InvestmentOptions = () => {
	const investmentOptions = [
		{
			title: "TESOURO PREFIXADO 2026",
			yieldAnnual: "10,24%",
			minimumInvestment: "32,57",
			dueDate: "01/01/2026",
		},
		{
			title: "TESOURO IPCA+ 2029",
			yieldAnnual: "IPCA + 5,50%",
			minimumInvestment: "31,11",
			dueDate: "15/05/2029",
		},
		{
			title: "TESOURO SELIC 2026",
			yieldAnnual: "SELIC + 0,0431%",
			minimumInvestment: "141,09",
			dueDate: "01/03/2026",
		},
	];

	return (
		<div className="bg-purple-700 p-10">
			<div className="container mx-auto">
				<h2 className="text-white text-3xl font-bold mb-6">
					OPÇÕES DE TÍTULOS
				</h2>
				<div className="flex justify-center flex-wrap">
					{investmentOptions.map((option, index) => (
						<InvestmentCard key={index} {...option} />
					))}
				</div>
				<div className="text-center">
					<button className="mt-8 bg-transparent hover:bg-purple-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
						Veja todos os títulos
					</button>
				</div>
			</div>
		</div>
	);
};

export default InvestmentCard;
