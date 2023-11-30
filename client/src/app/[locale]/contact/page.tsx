import React from "react";
import { Navbar } from "../../../components/Navbar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";

const Contact = ({ params: { locale } }: { params: { locale: string } }) => {
	unstable_setRequestLocale(locale);
	const t = useTranslations("Contact");

	return (
		<div>
			<Navbar />
			<div className="pt-20 md:pt-40">
				<h1 className="flex justify-center text-4xl font-bold mb-2 md:mb-8 pb-16">
					{t("title")}
				</h1>
				<div className="flex flex-col md:flex-row justify-center space-y-8 md:space-x-32 pb-16">
					<div className="flex flex-col items-center">
						<a
							href={t("links.marcelo.link")}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center flex flex-col items-center"
						>
							<Image
								src={t("links.marcelo.imageUrl")}
								width={200}
								height={200}
								alt={t("links.marcelo.alt")}
								className="rounded-full mb-2 transition duration-300 transform hover:scale-110 shadow-lg"
							/>
							<sub className="font-bold text-lg">
								{t("links.marcelo.name")}
							</sub>
						</a>
					</div>
					<div className="flex flex-col items-center">
						<a
							href={t("links.paulo.link")}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center flex flex-col items-center"
						>
							<Image
								src={t("links.paulo.imageUrl")}
								width={200}
								height={200}
								alt={t("links.paulo.alt")}
								className="rounded-full mb-2 transition duration-300 transform hover:scale-110 shadow-lg"
							/>
							<sub className="font-bold text-lg">
								{t("links.paulo.name")}
							</sub>
						</a>
					</div>
					<div className="flex flex-col items-center">
						<a
							href={t("links.victor.link")}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center flex flex-col items-center"
						>
							<Image
								src={t("links.victor.imageUrl")}
								width={200}
								height={200}
								alt={t("links.victor.alt")}
								className="rounded-full mb-2 transition duration-300 transform hover:scale-110 shadow-lg"
							/>
							<sub className="font-bold text-lg">
								{t("links.victor.name")}
							</sub>
						</a>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Contact;
