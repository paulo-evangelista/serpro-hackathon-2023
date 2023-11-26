import Link from "next/link";

export default function SignUp() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <h1 className="text-4xl">Cadastre-se</h1>

            <div className="flex flex-col w-2/3 justify-center items-center mt-10">
                <h2 className="text-2xl">Selecione o tipo de usuário</h2>

                <div className="flex w-full justify-around">
                    <Link
                        href={"/signup/government"}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Governo
                    </Link>
                    <Link
                        href={"/signup/user"}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Usuário
                    </Link>
                    <Link
                        href={"/signup/company"}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Empresa
                    </Link>
                </div>
            </div>
        </div>
    );
}