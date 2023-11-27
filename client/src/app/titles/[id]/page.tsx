"use client";
import { Navbar } from "@/app/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Title({ params }: { params: { id: string } }) {
	// Simulando dados do produto, você pode substituir isso por dados reais
	const [product, setProduct] = useState<{
		title: string;
		price: number;
		image: string;
		description: string;
	} | null>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			if (params.id) {
				setProduct({
					title: "Blocos de montar LegoTechnic 42083 Bugatti chiron 3599 peças em caixa",
					price: 4497,
					image: "https://www.tesourodireto.com.br/data/files/8A/A5/73/12/83D4D710C0F1C0D7894D49A8/tesouro-direto-carro-novo.png",
					description: "Construção recomendada: carro.",
				});
				setLoading(false);
			}
		}, 1000);
	}, [params.id]);

	return (
		<div className="container mx-auto mt-4 p-4 flex flex-col w-full">
			<Navbar />

			<div className="flex md:flex-row flex-col lg:flex-row mt-16 w-full md:w-3/4 mx-auto border justify-center md:justify-between shadow-lg rounded-lg p-4">
				<div className="flex-1 w-full md:mr-4">
					<div className="mb-4">
						{loading ? (
							<div className="spinner" />
						) : (
							<Image
								src={product?.image || ""}
								alt="Imagem do produto"
								width={350}
								height={350}
								className="w-full"
								placeholder="blur"
							/>
						)}
					</div>
				</div>

				{/* Informações do Produto */}
				<div className="flex-1 w-full">
					<h1 className="text-2xl font-bold mb-2">
						{loading
							? "Carregando..."
							: product?.title || "Carregando..."}
					</h1>
					<p className="text-xl font-semibold mb-2">
						{loading
							? "Carregando..."
							: `R$ ${product?.price || 0}`}
					</p>
					<ul className="mb-4">
						{loading ? (
							<li>Carregando...</li>
						) : (
							product?.description
								.split(".")
								.map((item, index) => (
									<li key={index}>{item}</li>
								))
						)}
					</ul>
					<div className="mb-4">
						{/* Botões de ação */}
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
							Comprar
						</button>
						<button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
							Adicionar ao carrinho
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
