"use client";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/app/[locale]/hooks/useAuth";
import { useRouter } from "@/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function GovernmentSignUp({
	params: { locale },
}: {
	params: { locale: string };
}) {
	unstable_setRequestLocale(locale);
	const { signUp }: any = useAuth();
	const t = useTranslations("SignUp.governmentSignUp");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const onSubmit = async (data: any) => {
		await signUp(data, "government")
			.then((res: any) => {
				toast.success(t("successMessage"));
				router.push("/login");
			})
			.catch((err: any) => {
				toast.error(t("errorMessage"));
				router.push("/login");
			});
	};

	return (
		<div>
			<Navbar />
			<div className="flex flex-row h-screen">
				<div className="w-1/3 bg-[#002c63] bg-cover bg-left flex flex-col justify-center items-center">
					<div className="flex flex-col justify-center items-center w-full">
						<h1 className="text-2xl text-white font-bold mb-8">
							{t("title")}
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 flex flex-col w-2/3"
						>
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
								{...register("firstName", { required: true })}
								placeholder={t("firstNamePlaceholder")}
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.firstName && (
								<span className="text-red-500">
									{t("requiredField")}
								</span>
							)}

							<input
								{...register("lastName", { required: true })}
								placeholder={t("lastNamePlaceholder")}
								className="px-4 py-4 border border-gray-300 rounded-md"
							/>
							{errors.lastName && (
								<span className="text-red-500">
									{t("requiredField")}
								</span>
							)}

							<input
								type="submit"
								value={t("submitButton")}
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
