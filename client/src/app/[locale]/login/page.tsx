"use client";
import { useAuth } from "@/app/[locale]/hooks/useAuth";
import { Link } from "@/navigation";
import { useRouter } from "@/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navbar } from "../components/Navbar";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function GovernmentSignUp() {
	const { login }: any = useAuth();
	const router = useRouter();

	const { account }: any = useAuth();

	useEffect(() => {
		if (account) {
			router.push("/");
		}
	}, [account]);

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

	const t = useTranslations("Login");

	return (
		<div>
			<Navbar />
			<div className="flex flex-col md:flex-row h-screen">
				<div
					className="w-full md:w-2/3 bg-cover bg-left flex items-center justify-center"
					style={{
						backgroundImage:
							"url(https://portalinvestidor.tesourodireto.com.br/Content/img/background-login-page.jpg)",
					}}
				>
					<div className="flex flex-col items-center justify-center w-full md:w-2/3 mt-20 md:mt-0">
						<div className="flex flex-col mb-8 items-start justify-center">
							<h1 className="text-2xl font-bold text-white">
								{t("titlePart1")}
							</h1>
							<h1 className="text-2xl font-bold text-white">
								{t("titlePart2")}
							</h1>
							<h1 className="text-2xl font-bold text-white">
								{t("titlePart3")}
							</h1>
						</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-8 flex flex-col w-4/5 md:w-1/2"
						>
							<select
								{...register("userType", { required: true })}
								className="px-4 py-4 border border-gray-300 rounded-md"
							>
								<option value="">{t("selectUserType")}</option>
								<option value="government">
									{t("userTypeGovernment")}
								</option>
								<option value="user">
									{t("userTypeUser")}
								</option>
								<option value="company">
									{t("userTypeCompany")}
								</option>
							</select>
							{errors.userType && (
								<span className="text-red-500">
									{t("requiredField")}
								</span>
							)}

							<input
								{...register("email", { required: true })}
								placeholder={t("emailPlaceholder")}
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.email && (
								<span className="text-red-500">
									{t("requiredField")}
								</span>
							)}

							<input
								{...register("password", { required: true })}
								placeholder={t("passwordPlaceholder")}
								type="password"
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.password && (
								<span className="text-red-500">
									{t("requiredField")}
								</span>
							)}

							<input
								type="submit"
								value={t("submitButton")}
								className="px-4 py-4 bg-blue-800 text-white rounded-full font-bold cursor-pointer hover:bg-blue-600"
							/>

							<hr className="my-4" />

							<Link
								href={"/signup"}
								className="mt-4 text-white hover:underline text-end"
							>
								{t("needToRegister")}
							</Link>
						</form>
					</div>
				</div>

				<div className="w-full md:w-1/3 bg-[#002c63] flex items-center justify-center p-2">
					<div className="flex flex-col items-start justify-center w-2/3">
						<h1 className="text-2xl font-bold text-white mb-8">
							{t("wantToOpenAccount")}
						</h1>
						<h1 className="text-md text-white mb-8">
							{t("openAccountDescription")}
						</h1>
						<h1 className="text-md font-bold text-white mb-2">
							{t("registrationIsEasier")}
						</h1>
						<h1 className="text-md font-bold text-white mb-8">
							{t("whoWantsToOpenAccount")}
						</h1>
						<button className="bg-blue-800 text-md mb-8 font-bold text-white px-36 py-3 rounded-full cursor-pointer hover:bg-blue-600">
							<Link href={"/signup"}>
								<p className="text-md font-bold text-white">
									{t("forYouButton")}
								</p>
							</Link>
						</button>
						<button className="bg-white text-md font-bold text-white px-24 py-3 rounded-full cursor-pointer hover:bg-gray-200">
							<Link href={"/signup"}>
								<p className="text-md font-bold text-blue-800">
									{t("forMinorButton")}
								</p>
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
