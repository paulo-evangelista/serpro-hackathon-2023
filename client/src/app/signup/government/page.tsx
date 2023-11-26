"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useForm } from "react-hook-form";

export default function GovernmentSignUp() {
	const { signUp }: any = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		await signUp(data, "government")
			.then((res: any) => {
				console.log(res);
			})
			.catch((err: any) => {
				console.error(err);
			});
	};

	return (
		<div className="flex flex-col flex-1 items-center justify-center p-2">
			<h1 className="text-4xl mb-8">Cadastro governamental</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col w-2/3"
			>
				<input
					{...register("email", { required: true })}
					placeholder="Email"
					defaultValue="marcelo.feitoza@sou.inteli.edu.br"
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
					defaultValue="123456"
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
					defaultValue="Marcelo"
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
					defaultValue="Feitoza"
					className="px-4 py-2 border border-gray-300 rounded-md"
				/>
				{errors.lastName && (
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
