import React from "react";
import { Navbar } from "../../../components/Navbar";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const About = ({ params: { locale } }: { params: { locale: string } }) => {
	unstable_setRequestLocale(locale);
	const t = useTranslations("About");

	return (
		<div>
			<Navbar />
			<div className="flex flex-1 flex-col px-4 md:px-0">
				<div className="relative mt-16">
					<div className="w-full h-80 overflow-hidden">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://www.tesourodireto.com.br/data/files/90/75/ED/FB/63D4D710C0F1C0D7894D49A8/banner-acessibilidade-conheca.png"
							alt={t("backgroundImageAlt")}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-start px-32">
						<div className="flex flex-col">
							<h1 className="text-white text-6xl font-bold mb-2">
								{t("mainTitleLine1")}
							</h1>
							<h1 className="text-white text-6xl font-bold mb-2">
								{t("mainTitleLine2")}
							</h1>
						</div>
					</div>
				</div>
				<div className="flex flex-1 flex-col md:flex-row px-4 md:px-0">
					<div className="md:w-1/3 flex items-center justify-center">
						<h1 className="mr-8 text-gray-500 text-3xl">
							{t("whatIsIt")}
						</h1>
					</div>
					<div className="md:w-2/3">
						<div className="md:pl-8 pr-32 pt-16">
							<h1 className="mb-4 text-xl text-gray-600">
								{t("description1")}
							</h1>
							<h1 className="mb-4 text-xl text-gray-600">
								{t("description2")}
							</h1>
							<h1 className="mb-4 text-xl text-gray-600">
								{t("description3")}
							</h1>
							<h1 className="mb-4 text-xl text-gray-600">
								{t("description4")}
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
