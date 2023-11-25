import Link from "next/link";

export default function CompanySignUp() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<h1 className="text-4xl">Sign Up</h1>

			<div className="flex flex-col w-2/3 justify-center items-center mt-10">
				{/* select your type of user: government, user, company */}
				<h2 className="text-2xl">Select your type of user</h2>

				<div className="flex w-full justify-around">
					<Link
						href={"/signup/government"}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Government
					</Link>
					<Link
						href={"/signup/user"}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						User
					</Link>
					<Link
						href={"/signup/company"}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Company
					</Link>
				</div>
			</div>
		</div>
	);
}
