import { Link } from "@/navigation";
import { Navbar } from "../components/Navbar";
import { useTranslations } from "next-intl";

export default function SignUp() {
	const t = useTranslations("SignUp");

	return (
		<div>
			<Navbar />
			<div className="flex flex-row h-screen">
				<div className="w-1/3 bg-[#002c63] bg-cover bg-left flex flex-col justify-center items-center">
					<div className="w-full">
						<h1 className="text-2xl text-white font-bold pl-16">
							{t("createYourAccount")}
						</h1>
						<h1 className="text-md text-white mb-8 pl-16 pr-16">
							{t("accountOpeningDescription")}
						</h1>

						<div className="w-full flex flex-col items-start space-y-8">
							<h2 className="text-xl mb-4 text-white pl-16">
								{t("whoAreYou")}
							</h2>

							<Link href={"/signup/government"}>
								<button className="bg-blue-800 hover:bg-blue-700 py-4 px-44 text-white font-bold rounded-full text-center ml-16">
									{t("government")}
								</button>
							</Link>
							<Link href={"/signup/user"}>
								<button className="bg-blue-800 hover:bg-blue-700 py-4 px-44 text-white font-bold rounded-full text-center ml-16">
									{t("user")}
								</button>
							</Link>
							<Link href={"/signup/company"}>
								<button className="bg-blue-800 hover:bg-blue-700 py-4 px-44 text-white font-bold rounded-full text-center ml-16">
									{t("company")}
								</button>
							</Link>
						</div>
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
