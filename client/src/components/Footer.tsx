"use client";
import { Link as IntlLink } from "@/navigation";
import { useTranslations } from "next-intl";
import tIcon from "@/assets/td.svg";
import Image from "next/image";

export const Footer = () => {
	const t = useTranslations("Footer");

	return (
		<div className="bg-[#26336a] text-[#f1f1f1] flex bottom-0 left-0 justify-between px-2 py-4 w-full">
			<div className="flex">
				<IntlLink href={"/"}>
					<Image
						src={tIcon}
						width={200}
						height={200}
						alt={t("logoAlt")}
					/>
				</IntlLink>
			</div>

			<div className="flex items-center">
				<p className="text-sm">{t("copyRight")}</p>
			</div>
		</div>
	);
};
