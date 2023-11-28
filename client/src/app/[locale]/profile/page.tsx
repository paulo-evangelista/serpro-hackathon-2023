"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { Navbar } from "../components/Navbar";
import QRCode from "qrcode.react";
import { getAbi } from "../utils/getAbi";
import { useAuth } from "../hooks/useAuth";
import { Account } from "../context";

const Profile = () => {
	const [balance, setBalance] = useState<string>(
		Intl.NumberFormat("pt-BR", {
			style: "decimal",
			minimumFractionDigits: 2,
		}).format(0)
	);
	const [loadingBalance, setLoadingBalance] = useState<boolean>(false);
	const { account }: { account: Account | null } = useAuth();

	const getProviderAndSigner = useCallback(() => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = provider.getSigner();
		return { provider, signer };
	}, []);

	const getDrexBalance = useCallback(async () => {
		if (loadingBalance) {
			console.log("getDrexBalance is already running");
			return;
		}

		setLoadingBalance(true);
		console.log("Loading balance started");

		try {
			if (window.ethereum) {
				const { provider, signer } = getProviderAndSigner();
				const address = (await signer).address;

				const drexContractAddress =
					"0x3493dF730cA3a8b1d9912F884bc55Be7AD04b608";
				const abi = await getAbi(drexContractAddress);
				const drexContract = new ethers.Contract(
					drexContractAddress,
					abi,
					provider
				);

				let parseDrex = (drexBalance: any): string => {
					let balance = parseFloat(
						ethers.formatUnits(drexBalance, 6)
					);
					return new Intl.NumberFormat("pt-BR", {
						style: "decimal",
						minimumFractionDigits: 2,
					}).format(balance);
				};

				setBalance(
					parseDrex(await drexContract.balanceOf(account.wallet))
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingBalance(false);
			console.log("Loading balance finished");
		}
	}, [account, getProviderAndSigner, loadingBalance]);

	useEffect(() => {
		// Call getDrexBalance immediately when the component mounts
		getDrexBalance();

		// Then set up an interval to call it every minute
		const intervalId = setInterval(getDrexBalance, 0.05 * 60 * 1000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, [getDrexBalance]);

	return (
		<div className="flex flex-col bg-[#f1f1f1] min-h-screen h-full">
			<Navbar />
			{account ? (
				<div className="container mx-auto p-6 mt-24">
					<h1 className="text-3xl font-semibold mb-4">Seu Perfil</h1>

					<div className="bg-white rounded-lg flex flex-col shadow-lg p-6 mb-8">
						<p className="text-md mb-2">
							Nome:{" "}
							<span className="text-xl text-gray-700">
								{account.name
									? account.name
									: account.firstName && account.lastName
									? `${account.firstName} ${account.lastName}`
									: account.firstName
									? account.firstName
									: account.lastName
									? account.lastName
									: "Não informado"}
							</span>
						</p>

						<p className="text-lg">
							Email:{" "}
							<span className="text-xl text-gray-700">
								{account.email}
							</span>
						</p>
					</div>

					<div className="bg-white rounded-lg flex flex-col md:flex-row shadow-lg p-6">
						<div className="flex flex-col w-full md:w-2/3">
							<p className="text-lg mb-2 overflow-ellipsis">
								Endereço atual: {account.wallet}
							</p>
							<p className="text-lg">
								Saldo em Real/DREX:{" "}
								<span className="text-xl text-gray-700">
									R$ {balance}
								</span>
							</p>
						</div>

						<div className="flex flex-col items-center w-full md:w-1/3 justify-center mt-4 md:mt-0">
							<p className="text-lg font-bold text-center">
								Agora é mais fácil investir em títulos públicos!
							</p>
							<div className="bg-white rounded-lg shadow-lg p-6 mb-6 mt-4">
								<QRCode
									value="https://example.com"
									size={200}
								/>
							</div>
							<p className="text-lg font-bold">
								Recarregue sua conta com PIX
							</p>
							<p className="text-lg font-bold text-gray-500 tracking-wide">
								Fácil, rápido e confiável
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="container mx-auto p-6 mt-24">
					<h1 className="text-3xl font-semibold mb-4">Seu Perfil</h1>
				</div>
			)}
		</div>
	);
};

export default Profile;
