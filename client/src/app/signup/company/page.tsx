"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CompanySignUp() {
	const { signUp }: any = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		resetField,
		setValue,
	} = useForm();

	const router = useRouter();

	const onSubmit = async (data: any) => {
		await signUp(data, "company")
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
			<h1 className="text-4xl mb-8">Cadastro de corretora</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col w-2/3"
			>
				<input
					{...register("name", { required: true })}
					placeholder="Nome da Empresa"
					className="px-4 py-2 border border-gray-300 rounded-md"
				/>
				{errors.name && (
					<span className="text-red-500">
						Este campo é obrigatório
					</span>
				)}

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
					{...register("wallet", { required: true })}
					placeholder="Endereço da carteira na rede Ethereum"
					className="px-4 py-2 border border-gray-300 rounded-md mr-2 w-full"
				/>

				{errors.walle && (
					<span className="text-red-500">
						Este campo é obrigatório
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
