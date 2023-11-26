"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserSignUp() {
	const [hasNoAddress, setHasNoAddress] = useState(false);

	const { signUp }: any = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		resetField,
	} = useForm();

	const onSubmit = async (data: any) => {
		await signUp(
			{
				...data,
				wallet: hasNoAddress ? "" : data.wallet,
			},
			"user"
		)
			.then((res: any) => {
				console.log(res);
			})
			.catch((err: any) => {
				console.error(err);
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
					<input
						{...register("wallet", { required: !hasNoAddress })}
						placeholder="Endereço da carteira na rede Ethereum"
						className="px-4 py-2 border border-gray-300 rounded-md mr-2 w-full"
						disabled={hasNoAddress}
					/>
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
