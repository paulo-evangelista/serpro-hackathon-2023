"use client";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useAuth } from "@/app/hooks/useAuth";

export default function Index(): JSX.Element {
	const { account, signUp }: any = useAuth();

	const data = {
		email: "marcelo.feitoza@sou.inteli.edu.br",
		password: "123456",
		wallet: null,
		name: null,
		firstName: "Marcelo",
		lastName: "Feitoza",
	};

	const handleSignUp = async () => {
		await signUp(data);
	};

	useEffect(() => {
		console.log(account);
	}, [account]);

	return (
		<div>
			<Navbar />

			<main className="mt-20 flex flex-col items-center justify-center">
				<h1 className="text-4xl">Bem vindo ao Tesouro Direto</h1>
				<h3 className="text-2xl">Escolha uma opção no menu acima</h3>

				<div>
					{account ? (
						<div>Welcome, {data.email}</div>
					) : (
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleSignUp}
						>
							Sign Up
						</button>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
}
