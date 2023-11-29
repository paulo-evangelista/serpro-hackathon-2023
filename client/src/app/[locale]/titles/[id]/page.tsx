"use client";
import { Navbar } from "@/app//[locale]/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Title({ params }: { params: { id: string } }) {
	const [product, setProduct] = useState<{
		name: string;
		price: number;
		ipfsImageURI: string;
		description: string;
	} | null>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:3050/platform/getAsset/${params.id}`);
				console.log(response)
				const data = response.data;

				setProduct({
					name: data.name,
					price: data.price,
					ipfsImageURI: data.ipfsImageURI,
					description: data.description,
				});
				console.log(data)
				return data;
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchData();
		}
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
								src={product?.ipfsImageURI || ""}
								alt="Imagem do produto"
								width={350}
								height={350}
								className="w-full"
							/>
						)}
					</div>
				</div>

				<div className="flex-1 w-full">
					<h1 className="text-2xl font-bold mb-2">
						{loading
							? "Carregando..."
							: product?.name || "Carregando..."}
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
						<button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2">
							Comprar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
