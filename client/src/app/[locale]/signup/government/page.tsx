"use client";
import { Navbar } from "@/app/[locale]/[locale]/components/Navbar";
import { useAuth } from "@/app/[locale]/[locale]/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function GovernmentSignUp() {
	const { signUp }: any = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const route = useRouter();

	const onSubmit = async (data: any) => {
		await signUp(data, "government")
			.then((res: any) => {
				toast.success("Cadastro realizado com sucesso!");
				route.push("/login");
			})
			.catch((err: any) => {
				toast.error("Erro ao realizar cadastro!");
			});
	};

	return (
		<div>
			<Navbar />
			<div className="flex flex-row h-screen">
				<div className="w-1/3 bg-[#002c63] bg-cover bg-left flex flex-col justify-center items-center">
					<div className="flex flex-col justify-center items-center w-full">
						<h1 className="text-2xl text-white font-bold mb-8">
							Cadastro governamental
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 flex flex-col w-2/3"
						>
							<input
								{...register("email", { required: true })}
								placeholder="Email"
								defaultValue="Digite seu email"
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
								defaultValue="Digite sua senha"
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
								defaultValue="Digite seu primeiro nome"
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
								defaultValue="Digite seu sobrenome"
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.lastName && (
								<span className="text-red-500">
									Este campo é obrigatório
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
