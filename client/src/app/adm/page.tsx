"use client";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

const AdmHome = () => {
	const { register, handleSubmit } = useForm();

	const governmentGrantCompanyPermission = async (data: any) => {};

	const companyGrantUserPermission = async (data: any) => {
		const path = `/company/approveUser/${data.userId}`;

		const account = localStorage.getItem("account");
		let jwt = "";
		if (account) {
			jwt = JSON.parse(account).jwt;
		}

		try {
			await axios
				.get(path, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
				})
				.then((res: { data: any }) => {
					toast.success("Permissão concedida com sucesso!");
					return res.data;
				})
				.catch((err: any) => {
					toast.error("Erro ao conceder permissão!");
					return err;
				});
		} catch (error) {
			console.error("Error during signup: ", error);
			throw error;
		}
	};

	const issueTitle = (data: any) => {
		// Lógica para emitir um título
	};

	const settleInvestors = () => {
		// Lógica para liquidar no vencimento
	};

	const investorData = [
		{
			nome: "Investidor 1",
			enderecoContrato: "Endereço 1",
			rentabilidade: "10%",
			vencimento: "01/01/2023",
			dataEmissao: "01/12/2022",
			quantidade: 100,
		},
		{
			nome: "Investidor 2",
			enderecoContrato: "Endereço 2",
			rentabilidade: "13%",
			vencimento: "01/01/2023",
			dataEmissao: "01/12/2022",
			quantidade: 230,
		},
		{
			nome: "Investidor 3",
			enderecoContrato: "Endereço 3",
			rentabilidade: "11%",
			vencimento: "01/01/2023",
			dataEmissao: "01/12/2022",
			quantidade: 3500,
		},
		{
			nome: "Investidor 4",
			enderecoContrato: "Endereço 4",
			rentabilidade: "9%",
			vencimento: "01/01/2023",
			dataEmissao: "01/12/2022",
			quantidade: 2000,
		},
	];

	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		toast.info("Buscando usuários...");

		const account = localStorage.getItem("account");

		let jwt = "";
		if (account) {
			jwt = JSON.parse(account).jwt;
		}

		const response = await axios
			.get("/user/getall", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwt}`,
				},
			})
			.then((res: { data: any }) => {
				toast.success("Usuários buscados com sucesso!");
				return res.data;
			})
			.catch((err: any) => {
				toast.error("Erro ao buscar usuários!");
				return err;
			});

		setUsers(response);
	};

	const getCompanies = async () => {};

	const [account, setAccount] = useState(null);

	useEffect(() => {
		let account = localStorage.getItem("account");
		if (account) {
			account = JSON.parse(account);
		}

		getUsers();
	}, []);

	return (
		<div className="container mx-auto p-8">
            <Navbar/>
			<div className="flex flex-col w-2/3 mt-20">
				<h1 className="text-4xl font-bold mb-8">
					Secretaria do Tesouro Nacional
				</h1>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-4">
						Conceder Permissão a usuário
					</h2>

					<form onSubmit={handleSubmit(companyGrantUserPermission)}>
						<select
							{...register("userId")}
							defaultValue={""}
							className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
						>
							<option value="" disabled>
								Selecione um usuário
							</option>
							{users.length > 0 &&
								users.map(
									(
										user: { id: number; email: string },
										index: number
									) => (
										<option key={index} value={user.id}>
											{user.email}
										</option>
									)
								)}
						</select>

						<button
							className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
							type="submit"
						>
							Conceder Permissão
						</button>
					</form>
				</div>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-4">
						Emitir um Título
					</h2>
					<form onSubmit={handleSubmit(issueTitle)}>
						<input
							type="text"
							{...register("titleName")}
							placeholder="Nome do Título"
							className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
						/>
						<input
							type="text"
							{...register("titleName")}
							placeholder="Símbolo"
							className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
						/>
						<input
							type="text"
							{...register("titleName")}
							placeholder="Rentabilidade"
							className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
						/>
						<input
							type="text"
							{...register("titleName")}
							placeholder="Vencimento"
							className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
						/>
						<button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
							Emitir Título
						</button>
					</form>
				</div>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-4">
						Notificar Investidores
					</h2>
					<table className="w-full border-collapse border border-gray-300">
						<thead>
							<tr className="bg-gray-200">
								<th className="border border-gray-300 px-4 py-2">
									Nome
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Endereço do contrato
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Rentabilidade
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Vencimento
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Data de Emissão
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Quantidade
								</th>
							</tr>
						</thead>
						<tbody>
							{investorData.map((investor, index) => (
								<tr key={index} className="bg-gray-100">
									<td className="border border-gray-300 px-4 py-2">
										{investor.nome}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{investor.enderecoContrato}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{investor.rentabilidade}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{investor.vencimento}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{investor.dataEmissao}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{investor.quantidade}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* <div>
					<form onSubmit={handleSubmit(grantPermission)}>
						<input
							type="text"
							{...register("corretoraInput")}
							placeholder="Endereço do contrato"
							className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
						/>
						<button
							onClick={settleInvestors}
							className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
						>
							Liquidar no Vencimento
						</button>
					</form>
				</div> */}
			</div>
		</div>
	);
};

export default AdmHome;
