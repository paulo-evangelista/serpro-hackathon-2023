"use client";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navbar } from "../components/Navbar";

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
		<div>
			<Navbar/>
			<div className="flex flex-row h-screen">
				<div className="w-2/3 bg-cover bg-left flex items-center justify-center" style={{backgroundImage: "url(https://portalinvestidor.tesourodireto.com.br/Content/img/background-login-page.jpg)"}}>
					<div className="flex flex-col items-center justify-center w-2/3">
						<div className="flex flex-col mb-8 items-start justify-center">
							<h1 className="text-2xl font-bold text-white">Já tem um conta no Direto</h1>
							<h1 className="text-2xl font-bold text-white">Direto?</h1>
							<h1 className="text-2xl font-bold text-white">Faça login agora.</h1>
						</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-8 flex flex-col w-1/2"
						>
							<select
								{...register("userType", { required: true })}
								className="px-4 py-4 border border-gray-300 rounded-md"
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
								type="submit"
								value="Entrar"
								className="px-4 py-4 bg-blue-800 text-white rounded-full font-bold cursor-pointer hover:bg-blue-600"
							/>

							<hr className="my-4" />

							<Link
								href={"/signup"}
								className="mt-4 text-white hover:underline text-end"
							>
								Precisa se registrar?
							</Link>
						</form>
					</div>
				</div>

				<div className="w-1/3 bg-[#002c63] flex items-center justify-center p-2">
					<div className="flex flex-col items-start justify-center w-2/3">
						<h1 className="text-2xl font-bold text-white mb-8">Quero abrir uma conta</h1>
						<h1 className="text-md text-white mb-8">Abra uma conta no Tesouro Direto e comece agora a investir. É rápido e prático.</h1>
						<h1 className="text-md font-bold text-white mb-2">Agora o cadastro é mais fácil para todos!</h1>
						<h1 className="text-md font-bold text-white mb-8">Para quem deseja abrir uma conta?</h1>
						<button className="bg-blue-800 text-md mb-8 font-bold text-white px-36 py-3 rounded-full cursor-pointer hover:bg-blue-600">
							<Link href={"/signup"}>
								<p className="text-md font-bold text-white">Para você</p>
							</Link>
						</button>
						<button className="bg-white text-md font-bold text-white px-24 py-3 rounded-full cursor-pointer hover:bg-gray-200">
							<Link href={"/signup"}>
								<p className="text-md font-bold text-blue-800">Para o menor de idade</p>
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
