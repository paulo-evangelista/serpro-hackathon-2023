"use client";
import { useAuth } from "@/app/hooks/useAuth";
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
		<div className="flex flex-col flex-1 items-center justify-center p-2">
			<h1 className="text-4xl mb-8">Cadastro de usuário</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col w-2/3"
			>
				<input
					{...register("email", { required: true })}
					placeholder="Email"
					className="px-4 py-2 border border-gray-300 rounded-md"
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
					className="px-4 py-2 border border-gray-300 rounded-md"
				/>
				{errors.password && (
					<span className="text-red-500">
						Este campo é obrigatório
					</span>
				)}

				<input
					{...register("firstName", { required: true })}
					placeholder="Primeiro nome"
					className="px-4 py-2 border border-gray-300 rounded-md"
				/>
				{errors.firstName && (
					<span className="text-red-500">
						Este campo é obrigatório
					</span>
				)}

				<input
					{...register("lastName", { required: true })}
					placeholder="Sobrenome"
					className="px-4 py-2 border border-gray-300 rounded-md"
				/>
				{errors.lastName && (
					<span className="text-red-500">
						Este campo é obrigatório
					</span>
				)}

				<div className="flex flex-1 flex-col">
					<div className="flex">
						<input
							{...register("wallet", { required: !hasNoAddress })}
							placeholder="Endereço da carteira na rede Ethereum"
							className="px-4 py-2 border border-gray-300 rounded-md mr-2 w-full"
							disabled={hasNoAddress}
						/>

						<button
							type="button"
							className="px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer hover:bg-orange-600 disabled:bg-gray-400 hover:disabled:bg-gray-500 hover:disabled:cursor-not-allowed"
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
					value="Enviar"
					className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
				/>
			</form>
		</div>
	);
}
