"use client";
import { Navbar } from "@/app/[locale]/[locale]/components/Navbar";
import { useAuth } from "@/app/[locale]/[locale]/hooks/useAuth";
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
		<div>
			<Navbar />
			<div className="flex flex-row h-screen">
				<div className="w-1/3 bg-[#002c63] bg-cover bg-left flex flex-col justify-center items-center">
					<div className="flex flex-col justify-center items-center w-full">
						<h1 className="text-2xl text-white font-bold mb-8">
							Cadastro de corretora
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 flex flex-col w-2/3"
						>
							<input
								{...register("name", { required: true })}
								placeholder="Nome da Empresa"
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.name && (
								<span className="text-red-500">
									Este campo é obrigatório
								</span>
							)}
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
								{...register("wallet", { required: true })}
								placeholder="Endereço da carteira na rede Ethereum"
								className="px-4 py-4 border border-gray-300 rounded-md mr-2 w-full"
							/>
							{errors.wallet && (
								<span className="text-red-500">
									Este campo é obrigatório
								</span>
							)}
							<input
								type="submit"
								value="Enviar"
								className="px-4 py-4 bg-blue-800 text-white rounded-full cursor-pointer hover:bg-blue-600"
							/>
						</form>
					</div>
				</div>
				<div
					className="w-2/3 bg-cover bg-left flex items-center justify-center"
					style={{
						backgroundImage:
							"url(https://napratica.org.br/wp-content/uploads/2018/09/btg-pactual.jpg)",
					}}
				></div>
			</div>
		</div>
	);
}
