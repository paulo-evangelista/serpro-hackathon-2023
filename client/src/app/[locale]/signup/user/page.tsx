"use client";
import { Navbar } from "@/app/[locale]/[locale]/components/Navbar";
import { useAuth } from "@/app/[locale]/[locale]/hooks/useAuth";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

declare global {
	interface Window {
		ethereum: any;
	}
}

export default function UserSignUp() {
	const [hasNoAddress, setHasNoAddress] = useState(false);

	const { signUp }: any = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		resetField,
	} = useForm();

	const router = useRouter();

	const importWallet = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = provider.getSigner();
		const address = (await signer).address;

		setValue("wallet", address);
	};

	const onSubmit = async (data: any) => {
		await signUp(
			{
				...data,
				wallet: hasNoAddress ? "" : data.wallet,
			},
			"user"
		)
			.then((res: any) => {
				toast.success("Cadastro realizado com sucesso!");
				router.push("/login");
			})
			.catch((err: any) => {
				toast.error("Erro ao realizar cadastro!\nTente novamente.");
			});
	};

	return (
		<div>
			<Navbar />
			<div className="flex flex-row h-screen">
				<div className="w-1/3 bg-[#002c63] bg-cover bg-left flex flex-col justify-center items-center">
					<div className="flex flex-col justify-center items-center w-full">
						<h1 className="text-2xl text-white font-bold mb-8">
							Cadastro de usuário
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 flex flex-col w-2/3"
						>
							<input
								{...register("email", { required: true })}
								placeholder="Email"
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.email && (
								<span className="text-red-500">
									Este campo é obrigatório
								</span>
							)}
							<input
								{...register("password", { required: true })}
								placeholder="Senha"
								type="password"
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.password && (
								<span className="text-red-500">
									Este campo é obrigatório
								</span>
							)}
							<input
								{...register("firstName", { required: true })}
								placeholder="Primeiro nome"
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.firstName && (
								<span className="text-red-500">
									Este campo é obrigatório
								</span>
							)}
							<input
								{...register("lastName", { required: true })}
								placeholder="Sobrenome"
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.lastName && (
								<span className="text-red-500">
									Este campo é obrigatório
								</span>
							)}
							{/* Parte do endereço da carteira */}
							<div className="flex flex-1 flex-col">
								<div className="flex">
									<input
										{...register("wallet", {
											required: !hasNoAddress,
										})}
										placeholder="Endereço da carteira na rede Ethereum"
										className="px-4 py-3 border border-gray-300 rounded-md mr-2 w-full"
										disabled={hasNoAddress}
									/>
									<button
										type="button"
										className="px-4 py-3 bg-orange-500 text-white rounded-md cursor-pointer hover:bg-orange-600 disabled:bg-gray-400 hover:disabled:bg-gray-500 hover:disabled:cursor-not-allowed"
										title="Importar carteira do Metamask"
										onClick={importWallet}
										disabled={hasNoAddress}
									>
										🦊
									</button>
								</div>
								<div>
									<input
										type="checkbox"
										checked={hasNoAddress}
										onChange={() => {
											resetField("wallet");
											setHasNoAddress(!hasNoAddress);
										}}
										placeholder="Não tenho endereço"
									/>
									<label className="text-md text-gray-500 ml-2">
										Não tenho endereço
									</label>
								</div>
							</div>
							{errors.wallet && !hasNoAddress && (
								<span className="text-red-500">
									Este campo é obrigatório
								</span>
							)}
							{hasNoAddress && (
								<span className="text-blue-500">
									Um endereço será gerado automaticamente
								</span>
							)}

							<input
								type="submit"
								value="Cadastrar"
								className="px-4 py-4 bg-blue-800 text-white rounded-full cursor-pointer hover:bg-blue-600"
							/>
						</form>
					</div>
				</div>
				<div
					className="w-2/3 bg-cover bg-left flex items-center justify-center"
					style={{
						backgroundImage:
							"url(https://portalinvestidor.tesourodireto.com.br/Content/img/background-login-page.jpg)",
					}}
				></div>
			</div>
		</div>
	);
}
