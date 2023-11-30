"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../app/[locale]/utils/axios";
import { AxiosResponse } from "axios";

export const AuthContext = createContext({});

type LoginData = {
	email: string;
	password: string;
};

type LoginResponse = LoginData & {
	id: number;
	firstName: string;
	lastName: string;
	created_at: string;
};

type SignUpData = {
	email: string;
	password: string;
	wallet?: string;
	name?: string;
	firstName?: string;
	lastName?: string;
};

type SignUpResponse = SignUpData & {
	id: number;
	created_at: string;
};

export interface Account {
	id: number;
	email: string;
	password: string;
	wallet?: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	created_at: string;
	type: string;
}

enum AccountType {
	Government,
	User,
	Company,
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [account, setAccount] = useState<Account | null>(null);

	const signUp = async (
		data: SignUpData,
		type: AccountType
	): Promise<SignUpResponse> => {
		let endpoint = `/auth/signup${type}`;

		try {
			const response: AxiosResponse<SignUpResponse> = await axios.post(
				endpoint,
				data
			);

			return response.data;
		} catch (error) {
			console.error("Error during signup: ", error);
			throw error;
		}
	};

	const login = async (
		data: LoginData,
		type: AccountType
	): Promise<LoginResponse> => {
		try {
			let endpoint = "/auth/login";

			const response: AxiosResponse<LoginResponse> = await axios.post(
				endpoint,
				data
			);

			setLoggedIn(response.data, type.toString());

			return response.data;
		} catch (error) {
			console.error("Error during login: ", error);
			throw error;
		}
	};

	const logout = (): void => {
		localStorage.removeItem("account");
		localStorage.removeItem("accountType");
		localStorage.removeItem("isLoggedIn");
		setAccount(null);
	};

	const setLoggedIn = (
		data: LoginResponse | SignUpResponse,
		type: string
	): void => {
		const accountData = {
			...data,
			type,
		};

		setAccount(accountData);

		localStorage.setItem("account", JSON.stringify(accountData));
		localStorage.setItem("accountType", type);
		localStorage.setItem("isLoggedIn", "true");
	};

	useEffect(() => {
		const account = localStorage.getItem("account");
		if (account) {
			setAccount(JSON.parse(account));
		} else {
			setAccount(null);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ account, signUp, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
