"use client";
import axios from "axios";
import React from "react";
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import Link from "next/link";

const Title = () => {
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


	return (
		<div>
			<Navbar />
			<div className="flex flex-1 flex-col min-h-screen mt-16">
				<div className="relative mt-4 mb-10">
					<div className="w-full h-80 overflow-hidden">
						<img
							src="https://www.tesourodireto.com.br/data/files/8B/75/DD/0C/63D4D710C0F1C0D7894D49A8/banner-acessibilidade-precos-taxas.png"
							alt="Imagem de fundo"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-start px-32">
						<h1 className="text-white text-4xl font-bold text-center">
							Escolha e invista em títulos públicos
						</h1>
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
						</div>
					</div>
					{/* Titles */}
					{authenticated ? (
					<div className="overflow-x-auto">
						<table className="table-auto w-full">
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
												href={`/title/${title.id}`}
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
						<p className="text-center text-red-500">
							Efetue login para ver a rentabilidade dos títulos
						</p>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Title;
