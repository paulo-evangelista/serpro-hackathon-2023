"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useForm } from "react-hook-form";

export default function GovernmentSignUp() {
	const { signUp } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		await signUp(data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="flex flex-col flex-1 items-center justify-center p-2">
			<h1 className="text-4xl mb-8">Login</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col w-2/3"
			>
				<select
					{...register("userType", { required: true })}
					className="px-4 py-2 border border-gray-300 rounded-md"
				>
					<option value="">Selecione o tipo de usuário</option>
					<option value="government">Governo</option>
					<option value="user">Usuário</option>
					<option value="company">Empresa</option>
				</select>
				{errors.userType && (
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
					type="submit"
					value="Enviar"
					className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
				/>
			</form>
		</div>
	);
}
