"use client";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navbar } from "../../../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { unstable_setRequestLocale } from "next-intl/server";

const AdmHome = ({ params: { locale } }: { params: { locale: string } }) => {
	unstable_setRequestLocale(locale);
	const { register, handleSubmit } = useForm();

	const governmentGrantCompanyPermission = async (data: any) => {
		const path = `/government/approveCompany/${data.companyId}`;

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
	const [companies, setCompanies] = useState([]);

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

	const getCompanies = async () => {
		toast.info("Buscando corretoras...");

		const account = localStorage.getItem("account");

		let jwt = "";
		if (account) {
			jwt = JSON.parse(account).jwt;
		}

		const response = await axios
			.get("/government/getAllCompanies", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwt}`,
				},
			})
			.then((res: { data: any }) => {
				toast.success("Corretoras buscadas com sucesso!");
				return res.data;
			})
			.catch((err: any) => {
				toast.error("Erro ao buscar corretoras!");
				return err;
			});

		setCompanies(response);
	};

	const liquidate = (data: any) => {};

	const { account }: any = useAuth();

	useEffect(() => {
		account?.type === "company" && getUsers();

		account?.type === "government" && getCompanies();
	}, [account]);

	return (
		<div className="container mx-auto p-8">
			<Navbar />
			<div className="flex flex-col w-2/3 mt-20">
				<h1 className="text-4xl font-bold mb-8">
					Secretaria do Tesouro Nacional
				</h1>

				<div className="mb-8">
					{account?.type === "government" && (
						<>
							<form
								onSubmit={handleSubmit(
									governmentGrantCompanyPermission
								)}
							>
								<h2 className="text-2xl font-bold mb-4">
									Conceder Permissão para Corretora
								</h2>

								<select
									{...register("companyId")}
									defaultValue={""}
									className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
								>
									<option value="" disabled>
										Selecione uma corretora
									</option>
									{companies.length > 0 &&
										companies.map(
											(
												company: {
													id: number;
													name: string;
												},
												index: number
											) => (
												<option
													key={index}
													value={company.id}
												>
													{company.name}
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

							<div>
								<h3>Corretoras com permissão</h3>
								<table className="w-full border-collapse border border-gray-300">
									<thead>
										<tr className="bg-gray-200">
											<th className="border border-gray-300 px-4 py-2">
												Nome
											</th>
											<th className="border border-gray-300 px-4 py-2">
												Email
											</th>
											<th className="border border-gray-300 px-4 py-2">
												Endereço do contrato
											</th>
										</tr>
									</thead>
									<tbody>
										{companies.length > 0 &&
											companies.map(
												(company: {
													id: number;
													name: string;
													email: string;
													wallet: string;
												}) => (
													<tr
														key={company.id}
														className="bg-gray-100"
													>
														<td className="border border-gray-300 px-4 py-2">
															{company.name}
														</td>
														<td className="border border-gray-300 px-4 py-2">
															{company.email}
														</td>
														<td className="border border-gray-300 px-4 py-2">
															{company.wallet}
														</td>
													</tr>
												)
											)}
									</tbody>
								</table>
							</div>
						</>
					)}

					{account?.type === "company" && (
						<>
							<form
								onSubmit={handleSubmit(
									companyGrantUserPermission
								)}
							>
								<h2 className="text-2xl font-bold mb-4">
									Conceder Permissão para Investidor
								</h2>

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
												user: {
													id: number;
													email: string;
												},
												index: number
											) => (
												<option
													key={index}
													value={user.id}
												>
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

							<div>
								<h3>Usuários com permissão</h3>
								<table className="w-full border-collapse border border-gray-300">
									<thead>
										<tr className="bg-gray-200">
											<th className="border border-gray-300 px-4 py-2">
												Nome
											</th>
											<th className="border border-gray-300 px-4 py-2">
												Email
											</th>
											<th className="border border-gray-300 px-4 py-2">
												Endereço do contrato
											</th>
										</tr>
									</thead>
									<tbody>
										{users.length > 0 &&
											users.map(
												(user: {
													id: number;
													name?: string;
													firstName?: string;
													lastName?: string;
													email: string;
													wallet: string;
												}) => (
													<tr
														key={user.id}
														className="bg-gray-100"
													>
														<td className="border border-gray-300 px-4 py-2">
															{user.name ||
																`${user?.firstName} ${user?.lastName}`}
														</td>
														<td className="border border-gray-300 px-4 py-2">
															{user.email}
														</td>
														<td className="border border-gray-300 px-4 py-2">
															{user.wallet}
														</td>
													</tr>
												)
											)}
									</tbody>
								</table>
							</div>
						</>
					)}
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

				<div>
					<form onSubmit={handleSubmit(liquidate)}>
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
				</div>
			</div>
		</div>
	);
};

export default AdmHome;
