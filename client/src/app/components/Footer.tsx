import Link from "next/link";

export const Footer = () => {
	return (
		<div className="bg-[#26336a] text-[#f1f1f1] flex bottom-0 left-0 justify-between px-2 py-4 w-full absolute">
			<div className="flex">
				<Link href={"/"}>
					<p className="text-2xl">Tesouro Direto</p>
				</Link>
			</div>

			<div className="flex">
				<p className="text-sm">
					© 2023 Tesouro Direto. All rights reserved.
				</p>
			</div>
		</div>
	);
};
