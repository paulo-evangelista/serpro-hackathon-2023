import React from "react";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Image from "next/image";
import { useTranslations } from "next-intl";

const MyTitle = ({
	params: { locale },
}: {
	params: {
		locale: string;
	};
}) => {
	const t = useTranslations("MyTitle");

	return (
		<div>
			<Navbar />
			<div className="flex flex-1 flex-col min-h-screen">
				<div className="relative mt-[4.25rem] mb-10">
					<div className="w-full h-80 overflow-hidden">
						<Image
							src="https://www.tesourodireto.com.br/data/files/12/85/08/1C/63D4D710C0F1C0D7894D49A8/banner-acessibilidade-tipos-tesouro.png"
							alt={t("bannerAlt")}
							objectFit="cover"
							width={200}
							height={200}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-center">
						<h1 className="text-white text-4xl font-bold text-center">
							{t("pageTitle")}
						</h1>
					</div>
				</div>
				<div className="max-w-screen-md mx-auto">
					<h1 className="text-4xl text-gray-700 font-semibold mb-8">
						{t("profitabilityTitle")}
					</h1>

					<div className="border border-gray-600 rounded-md flex flex-col justify-center mb-8">
						<div className="flex items-center justify-between p-4">
							<div className="flex items-center justify-center w-1/2">
								<div className="bg-green-500 rounded-full w-2 h-2 mr-2"></div>
								<p className="text-gray-700 text-2xl">
									{t("marketStatus")}
								</p>
							</div>

							<div className="mx-2 text-4xl text-gray-400 font-thin">
								|
							</div>

							<div className="flex flex-col justify-center">
								<p className="text-gray-700">
									{t("operationHours")}
								</p>
								<p className="text-gray-700 text-lg font-semibold">
									{t("serviceAvailability")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MyTitle;
