import React from 'react';

const InvestmentGoalCard = ({ goalName, backgroundImage }: { goalName: string, backgroundImage: string }) => {
	return (
		<div 
		className="max-w-sm rounded overflow-hidden shadow-lg p-6 m-4 flex items-center justify-center relative" 
		style={{
		  backgroundImage: `url(${backgroundImage})`,
		  backgroundSize: 'cover',
		  height: '200px',
		  width: '200px',
		}}
	  	>
			<button className="text-xl font-bold text-white hover:underline bg-black bg-opacity-50 py-2 px-4 rounded-full">
			{goalName}
			</button>
	  	</div>
	);
  };
  
const InvestmentGoals = () => {
	const goals = [
	  { goalName: 'Viajar', backgroundImage: 'https://www.tesourodireto.com.br/data/files/BE/A5/D7/70/93D4D710C0F1C0D7894D49A8/tesouro-direto-viajar.png' },
	  { goalName: 'Carro Novo', backgroundImage: 'https://www.tesourodireto.com.br/data/files/8A/A5/73/12/83D4D710C0F1C0D7894D49A8/tesouro-direto-carro-novo.png' },
	  { goalName: 'Estudos', backgroundImage: 'https://www.tesourodireto.com.br/data/files/C3/C5/32/09/14D4D710C0F1C0D7894D49A8/tesouro-direto-estudos.png' },
	  { goalName: 'Casa Nova', backgroundImage: 'https://www.tesourodireto.com.br/data/files/8F/B5/78/AF/04D4D710C0F1C0D7894D49A8/tesouro-direto-casa-nova.png' },
	];
  
	return (
	  <div className="bg-gray-100 p-10">
		<div className="container mx-auto text-center">
		  <h2 className="text-3xl font-bold mb-6">ESCOLHA SEU OBJETIVO</h2>
		  <div className="flex justify-center flex-wrap">
			{goals.map((goal, index) => (
			  <InvestmentGoalCard key={index} {...goal} />
			))}
		  </div>
		  <p className="my-6">
			Aplique no Tesouro Direto e chegue mais perto dos seus sonhos.
		  </p>
		  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
			Descubra o título ideal
		  </button>
		  <p className="text-xs mt-4">*As simulações são baseadas em projeções de mercado. Isso não garante resultados futuros.</p>
		</div>
	  </div>
	);
};

export default InvestmentGoals;