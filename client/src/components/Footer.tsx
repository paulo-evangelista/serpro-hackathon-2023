import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export const Footer = () => {
	const t = useTranslations("Footer");

	return (
		<div className="bg-[#26336a] text-[#f1f1f1] flex bottom-0 left-0 justify-between px-2 py-4 w-full">
			<div className="flex">
				<Link href={"/"}>
					<p className="text-2xl">{t("directTreasury")}</p>
				</Link>
			</div>

			<div className="flex">
				<p className="text-sm">{t("copyRight")}</p>
			</div>
		</div>
	);
};
