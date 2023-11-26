"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
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
};

enum AccountType {
	Government,
	User,
	Company,
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [account, setAccount] = useState<SignUpData | null>(null);

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

			setAccount(response.data);

			return response.data;
		} catch (error) {
			console.error("Error during signup: ", error);
			throw error;
		}
	};

	const login = async (data: LoginData): Promise<LoginResponse> => {
		try {
			let endpoint = "/auth/login";

			const response: AxiosResponse<LoginResponse> = await axios.post(
				endpoint,
				data
			);

			setAccount(response.data);

			return response.data;
		} catch (error) {
			console.error("Error during login: ", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider value={{ account, signUp, login }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
