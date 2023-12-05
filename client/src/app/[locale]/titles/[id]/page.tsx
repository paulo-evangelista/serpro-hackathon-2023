"use client";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "@/navigation";

export default function Title({
	params: { id, locale },
}: {
	params: { id: string; locale: string };
}) {
	const { account }: any = useAuth();

	unstable_setRequestLocale(locale);

	const [product, setProduct] = useState<{
		id: number;
		name: string;
		price: number;
		ipfsImageURI: string;
		totalSupply: number;
		availableSupply: number;
		interest: number;
		deadline: number;
		address: string;
		createdAt: string;
		description: string;
	} | null>();
	// {
	//     "id": 2,
	//     "name": "Título Pre Fixado",
	//     "ipfsImageURI": "QmVhukDoiXFLPWxsMhYgiiV5HT1UfZUzL1wqfk5Mi3Z1Qa",
	//     "total_supply": 500,
	//     "available_supply": 500,
	//     "price": 1,
	//     "interest": 101,
	//     "deadline": 170165880,
	//     "address": "0x2A2CD301E7ba6Dd7D9FfC0CCc514636b86374BE1",
	//     "created_at": "2023-12-04T23:05:29.507Z"
	// }

	const router = useRouter();

	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3050/platform/getAsset/${id}`
			);
			const data = response.data;

			setProduct({
				id: data.id,
				name: data.name,
				price: data.price,
				ipfsImageURI: data.ipfsImageURI,
				totalSupply: data.total_supply,
				availableSupply: data.available_supply,
				interest: data.interest,
				deadline: data.deadline,
				address: data.address,
				createdAt: data.created_at,
				description: data.description,
			});
			return data;
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
			console.log(product);
		}
	};

	useEffect(() => {
		setLoading(true);

		if (id) {
			fetchData();
		}
	}, [id]);

	const getValueInUSD = async (e: any) => {
		const value = e.target.value;
		setValueToBuy(value);

		try {
			const response = await axios.get(
				`http://localhost:3050/user/datafeed/${value}`
			);
			const data = response.data;
			setValueInUSD(data.usdAmount);
			return data;
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			console.log(valueInUSD);
		}
	};

	const [valueToBuy, setValueToBuy] = useState(0.0);
	const [valueInUSD, setValueInUSD] = useState(0.0);

	const t = useTranslations("TitlePage");

	const buy = async () => {
		const account = localStorage.getItem("account");
		let jwt = "";
		if (account) {
			jwt = JSON.parse(account).jwt;
		}

		if (
			valueToBuy >
			(product?.availableSupply ?? 0) * (product?.price ?? 0)
		) {
			toast.error("Quantidade indisponível");
			return;
		}

		if (valueInUSD <= 0) {
			toast.error("Valor inválido");
			return;
		}

		if (product?.availableSupply === 0) {
			toast.error("Não há mais títulos disponíveis");
			return;
		}

		const body = {
			assetId: id,
			financialAmount: valueToBuy,
		};

		try {
			const response = await axios.post(
				`http://localhost:3050/user/newInvestment`,
				body,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			toast.success("Compra realizada com sucesso!");
			const data = response.data;

			fetchData();

			router.push("/my-titles");

			return data;
		} catch (error) {
			toast.error("Erro ao comprar...\nTente novamente mais tarde");
			console.error("Error fetching data:", error);
		} finally {
			console.log(valueInUSD);
		}
	};

	return (
		<div className="container mx-auto mt-4 p-4 flex flex-col w-full">
			<Navbar />

			<div className="flex md:flex-row flex-col lg:flex-row mt-16 w-full md:w-4/5 mx-auto  justify-center md:justify-between shadow-lg rounded-lg p-4 border-red-500">
				<div className="flex-1 w-full md:mr-4">
					<div className="mb-4">
						{loading ? (
							<div className="spinner" />
						) : (
							<Image
								src={`https://ipfs.io/ipfs/${product?.ipfsImageURI}`}
								alt={t("productImageAlt")}
								width={350}
								height={350}
								className="w-full rounded-lg"
							/>
						)}
					</div>
				</div>

				<div className="flex-1 w-full">
					<h1 className="text-4xl font-bold mb-2">
						{loading ? t("loading") : product?.name || t("loading")}
					</h1>
					<p className="text-xl font-semibold mb-2">
						{loading
							? t("loading")
							: `${t("pricePrefix")} ${product?.price || 0}`}
					</p>
					<ul className="mb-4">
						{loading ? (
							<p className="typewritter">{t("loading")}</p>
						) : (
							<>
								<li>
									<span className="font-bold">
										{t("deadlineLabel")}:
									</span>{" "}
									{
										// 170165880 -> 2023-12-04T23:05:29.507Z
										new Date(
											Number(
												`${product?.deadline}0000`
											) || 0
										).toLocaleDateString()
									}
								</li>
								<li>
									<span className="font-bold">
										{t("interestLabel")}:
									</span>{" "}
									{(product?.interest ?? 0) / 100 || 0}%{" "}
									{t("perMonth")}
								</li>
								<li>
									<span className="font-bold">
										{t("totalLabel")}:
									</span>{" "}
									{product?.totalSupply || 0}
								</li>
								<li>
									<span className="font-bold">
										{t("availableLabel")}:
									</span>{" "}
									{product?.availableSupply || 0}
								</li>
							</>
						)}
					</ul>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="quantity"
						>
							{t("quantityLabel")}
						</label>
						<div className="flex mb-2 bg-gray-200 rounded-full">
							<input
								value={valueToBuy}
								onChange={getValueInUSD}
								className="border rounded-full lg:rounded-l-full w-2/3 p-2"
								type="number"
								name="quantity"
								min={0.0}
								max={1000000.0}
								placeholder="Quantidade"
							/>
							<div className="flex justify-end w-1/3 items-center">
								<p className="text-gray-700 text-md font-bold px-2">
									{valueInUSD.toFixed(2)} USD
								</p>
							</div>
						</div>

						<button
							className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2"
							type="submit"
							onClick={buy}
							disabled={product?.availableSupply === 0}
						>
							{t("buyButton")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
