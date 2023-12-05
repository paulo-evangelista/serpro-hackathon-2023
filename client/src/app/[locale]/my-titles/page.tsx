"use client";
import React, { useCallback } from "react";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context";
import { Link } from "@/navigation";

// {
//     "id": 6,
//     "created_at": "2023-12-05T04:57:21.622Z",
//     "amount": 350,
//     "ipfs_uri": "bafkreidaseva2kpv3pndxxe7qwp7xts7zevrwu5g6aicrwcazmleeofvj4",
//     "asset": {
//         "id": 1,
//         "name": "Título Pre Fixado",
//         "ipfsImageURI": "QmVhukDoiXFLPWxsMhYgiiV5HT1UfZUzL1wqfk5Mi3Z1Qa",
//         "total_supply": 500,
//         "available_supply": 40,
//         "price": 1,
//         "interest": 101,
//         "deadline": 2,
//         "address": "0xF7fDf43b421620Af3C0199910D1b243fAD8E8e5C",
//         "created_at": "2023-12-04T23:04:01.909Z"
//     }
// }

interface Title {
	id: number;
	amount: number;
	created_at: string;
	ipfs_uri: string;
	asset: {
		id: number;
		name: string;
		ipfsImageURI: string;
		total_supply: number;
		available_supply: number;
		price: number;
		interest: number;
		deadline: number;
		address: string;
		created_at: string;
	};
}

const MyTitle = ({
	params: { locale },
}: {
	params: {
		locale: string;
	};
}) => {
	const t = useTranslations("MyTitle");
	const { account }: any = useAuth();

	const [investments, setInvestments] = useState<Title[] | []>([]);

	const fetchInvestments = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3050/user/${account.id}/investments`
			);
			setInvestments(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Erro ao obter investimentos:", error);
		}
	};

	useEffect(() => {
		fetchInvestments();
	}, [account]);

	const [valueInUSD, setValueInUSD] = useState(0);

	const getValueInUSD = useCallback(
		async (value: any) => {
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
		},
		[valueInUSD]
	);

	useEffect(() => {
		getValueInUSD(
			investments.reduce(
				(acc: number, curr: Title) =>
					acc + curr.amount * curr.asset.price,
				0
			)
		);
	}, [getValueInUSD, investments]);

	return (
		<div>
			<Navbar />
			<div className="flex flex-1 flex-col min-h-screen">
				<div className="relative mt-[4.25rem] mb-10">
					<div className="w-full h-80 overflow-hidden">
						<Image
							src="https://www.tesourodireto.com.br/data/files/12/85/08/1C/63D4D710C0F1C0D7894D49A8/banner-acessibilidade-tipos-tesouro.png"
							alt={t("bannerAlt")}
							objectFit="cover"
							width={200}
							height={200}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-center">
						<h1 className="text-white text-4xl font-bold text-center">
							{t("pageTitle")}
						</h1>
					</div>
				</div>
				<div className="mx-auto w-full md:w-4/5 lg:w-2/3 px-2">
					<h1 className="text-4xl text-gray-700 font-semibold mb-8">
						{t("profitabilityTitle")}
					</h1>

					<div className="border border-gray-600 rounded-md flex flex-col justify-center mb-8">
						<div className="flex items-center justify-between p-4">
							<div className="flex items-center justify-center w-1/2">
								<div className="bg-green-500 rounded-full w-2 h-2 mr-2"></div>
								<p className="text-gray-700 text-2xl">
									{t("marketStatus")}
								</p>
							</div>

							<div className="mx-2 text-4xl text-gray-400 font-thin">
								|
							</div>

							<div className="flex flex-col justify-center">
								<p className="text-gray-700">
									{t("operationHours")}
								</p>
								<p className="text-gray-700 text-lg font-semibold">
									{t("serviceAvailability")}
								</p>
							</div>
						</div>
					</div>

					{/* Investment details: Total invested, last investment... */}
					<div className="flex flex-col md:flex-row mb-8 w-full">
						<div className="border border-gray-600 rounded-md flex flex-col justify-center w-full p-4">
							<p className="text-gray-700 text-4xl font-semibold mb-4">
								{t("InvestmentDetails")}
							</p>

							<div className="flex flex-col md:flex-row justify-center md:justify-between">
								<div className="flex flex-col">
									<p className="text-gray-600 text-lg md:text-base lg:text-lg font-semibold">
										{t("totalInvested")}{" "}
									</p>
									<span className="text-gray-900 text-2xl md:text-xl lg:text-2xl">
										R$ / DREX{" "}
										{investments.reduce(
											(acc: number, curr: Title) =>
												acc +
												curr.amount * curr.asset.price,
											0
										)}{" "}
										<span className="text-gray-400 text-lg md:text-base lg:text-lg font-semibold mb-4">
											USD {valueInUSD.toFixed(2)}
										</span>
									</span>
								</div>

								<div className="flex flex-col">
									<p className="text-gray-600 text-lg md:text-base lg:text-lg font-semibold">
										{t("lastInvestment")}{" "}
									</p>
									<span className="text-gray-900 text-2xl md:text-xl lg:text-2xl">
										{new Date(
											investments.sort(
												(a: Title, b: Title) => {
													return (
														new Date(
															b.created_at
														).getTime() -
														new Date(
															a.created_at
														).getTime()
													);
												}
											)[0]?.asset?.created_at
										).toDateString() ?? "N/A"}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="border border-gray-600 rounded-md w-full mb-8">
							<thead>
								<tr className="bg-gray-200 p-2 text-lg">
									<th>{t("investmentId")}</th>
									<th>{t("investedAmount")}</th>
									<th>{t("investmentDate")}</th>
									<th>{t("asset")}</th>
									<th>{t("ipfsUri")}</th>
								</tr>
							</thead>
							<tbody>
								{investments.map((investment: Title) => {
									return (
										<tr
											key={investment.id}
											className={`hover:bg-gray-100`}
										>
											<td className={`p-2 text-center`}>
												{investment.id}
											</td>
											<td className={`p-2 text-center`}>
												{investment.amount *
													investment.asset.price}
											</td>
											<td className={`p-2 text-center`}>
												{new Date(
													investment.created_at
												).toDateString()}
											</td>
											<td className={`p-2 text-center`}>
												{investment.asset.name}
											</td>
											<td
												className={`p-2 text-center hover:`}
											>
												<Link
													href={`https://ipfs.io/ipfs/${investment.ipfs_uri}`}
													target="_blank"
													className={`text-blue-500 hover:underline`}
												>
													Metadata
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MyTitle;
