"use client";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function GovernmentSignUp() {
	const { login }: any = useAuth();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		await login(data, data.userType)
			.then((res: any) => {
                toast.success("Login realizado com sucesso! Redirecionando...");
				router.push("/");
			})
			.catch((err: any) => {
                toast.error("Erro ao realizar login!\nTente novamente.");
				alert(err.message);
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

				<hr className="my-4" />

				<Link
					href={"/signup"}
					className="mt-4 text-blue-500 hover:underline text-end"
				>
					Precisa se registrar?
				</Link>
			</form>
		</div>
	);
}
