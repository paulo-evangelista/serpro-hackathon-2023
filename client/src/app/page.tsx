import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function Index() {
	return (
		<div>
			<Navbar />

			<main className="mt-16 flex flex-col items-center justify-center">
				<h1 className="text-4xl">Bem vindo ao Tesouro Direto</h1>
				<h3 className="text-2xl">Escolha uma opção no menu acima</h3>
			</main>

			<Footer />
		</div>
	);
}
