"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ethers } from "ethers";
import { Navbar } from "../../../components/Navbar";
import QRCode from "qrcode.react";
import { getAbi } from "../utils/getAbi";
import { useAuth } from "../hooks/useAuth";
import { Account } from "../../../context";
import { toast } from "react-toastify";
import { useRouter } from "@/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const Profile = ({ params: { locale } }: { params: { locale: string } }) => {
	unstable_setRequestLocale(locale);
	const [balance, setBalance] = useState<string>(
		Intl.NumberFormat("pt-BR", {
			style: "decimal",
			minimumFractionDigits: 2,
		}).format(0)
	);

	const [reloadAmount, setReloadAmount] = useState<string>("");
	const [showQRCode, setShowQRCode] = useState(false);
	const [qrValue, setQRValue] = useState("");
	const [amountToReload, setAmountToReload] = useState("");

	const handleReloadAmountChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setReloadAmount(event.target.value);
	};

	const handleReload = () => {
		if (parseFloat(reloadAmount) > 0) {
			const newQRValue = `https://example.com/?amount=${reloadAmount}`;
			setQRValue(newQRValue);
			setAmountToReload(reloadAmount);
			setShowQRCode(true);
		} else {
			setShowQRCode(false);
		}
	};

	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const [loadingBalance, setLoadingBalance] = useState<boolean>(false);
	const { account }: any = useAuth();

	const getProviderAndSigner = useCallback(() => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = provider.getSigner();
		return { provider, signer };
	}, []);

	const getDrexBalance = useRef<() => Promise<void>>();
	getDrexBalance.current = useCallback(async () => {
		console.time("getDrexBalance");
		if (loadingBalance) {
			return;
		}

		setLoadingBalance(true);

		try {
			if (window.ethereum) {
				const { provider, signer } = getProviderAndSigner();
				const address = (await signer).address;

				const drexContractAddress =
					"0xDA478bFaE6699C5B9f1150b0610BA2DAABC0bcdb";
				const abi = await getAbi(drexContractAddress);
				const drexContract = new ethers.Contract(
					drexContractAddress,
					abi,
					provider
				);

				let parseDrex = (drexBalance: any): string => {
					let balance = parseFloat(
						ethers.formatUnits(drexBalance, 18)
					);
					return new Intl.NumberFormat("pt-BR", {
						style: "decimal",
						minimumFractionDigits: 2,
					}).format(balance);
				};

				setBalance(
					parseDrex(await drexContract.balanceOf(account?.wallet))
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingBalance(false);
			console.timeEnd("getDrexBalance");
		}
	}, [account, getProviderAndSigner, loadingBalance]);

	useEffect(() => {
		getDrexBalance.current && getDrexBalance.current();

		const intervalId = setInterval(() => {
			getDrexBalance.current && getDrexBalance.current();
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);

	const handlePaymentConfirmation = async () => {
		if (!amountToReload || !reloadAmount) {
			toast.error("Insira um valor válido para recarregar.");
			return;
		}

		setIsProcessingPayment(true);

		try {
			let reloadAmountNumber = Number(reloadAmount);

			const response = await axios.get(
				`http://localhost:3050/payments/pix/${
					reloadAmountNumber * 100
				}/${account.email}`
			);

			setIsProcessingPayment(false);
			toast.success("Pagamento concluído!");
			return response.data;
		} catch (error) {
			setIsProcessingPayment(false);
			toast.error(
				"Erro ao processar pagamento. Tente novamente mais tarde."
			);
			return error;
		}
	};

	const t = useTranslations("Profile");

	return (
		<div className="flex flex-col bg-[#f1f1f1] min-h-screen h-full">
			<Navbar />
			{account ? (
				<div className="container mx-auto p-6 mt-24">
					<h1 className="text-3xl font-semibold mb-4">
						{t("yourProfile")}
					</h1>

					<div className="bg-white rounded-lg flex flex-col shadow-lg p-6 mb-8">
						<p className="text-md mb-2">
							{t("name")}:{" "}
							<span className="text-xl text-gray-700">
								{account.name ||
								(account.firstName && account.lastName)
									? `${account.firstName} ${account.lastName}`
									: account.firstName ||
									  account.lastName ||
									  t("notProvided")}
							</span>
						</p>

						<p className="text-md">
							{t("email")}:{" "}
							<span className="text-xl text-gray-700">
								{account.email}
							</span>
						</p>
					</div>

					<div className="bg-white rounded-lg flex flex-col md:flex-row shadow-lg p-6">
						<div className="flex flex-col w-full md:w-2/3">
							<p className="text-lg mb-2 overflow-ellipsis md:flex hidden">
								{t("currentAddress")}: {account.wallet}
							</p>

							<p className="text-lg mb-2 overflow-ellipsis md:hidden flex flex-row items-center">
								{t("currentAddress")}:{" "}
								<span className="text-xl text-gray-700">
									{account.wallet.slice(0, 6)}...
									{account.wallet.slice(-4)}
								</span>
							</p>

							<p className="text-lg flex items-center">
								{t("balance")}:{" "}
								<span className="text-xl text-gray-700">
									R$ {balance}
								</span>
								{loadingBalance && (
									<svg
										className="ml-2 animate-spin h-5 w-5 mr-3 ..."
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
										></path>
									</svg>
								)}
							</p>
						</div>

						<div className="flex flex-col items-center w-full md:w-1/3 justify-center mt-4 md:mt-0">
							<p className="text-lg font-bold text-center pb-4">
								{t("easyToInvest")}
							</p>
							<p className="text-lg font-bold">
								{t("reloadWithPix")}
							</p>
							<p className="text-lg font-bold text-gray-500 tracking-wide">
								{t("easyFastReliable")}
							</p>
							<div className="mt-6">
								<input
									type="text"
									value={reloadAmount}
									onChange={handleReloadAmountChange}
									placeholder={t("enterAmount")}
									className="border border-gray-300 px-2 py-4 rounded mr-2"
								/>
								<button
									onClick={handleReload}
									className="bg-blue-800 text-white px-4 py-4 rounded hover:bg-blue-600"
								>
									{t("reload")}
								</button>
							</div>
							{/* QR code and payment confirmation elements */}
						</div>
					</div>
				</div>
			) : (
				<div className="container mx-auto p-6 mt-24">
					<h1 className="text-3xl font-semibold mb-4">
						{t("yourProfile")}
					</h1>
				</div>
			)}
		</div>
	);
};

export default Profile;
