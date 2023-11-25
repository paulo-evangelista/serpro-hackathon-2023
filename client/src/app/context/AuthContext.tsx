"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [account, setAccount] = useState<{
		email: string,
		name: string,
		wallet: string
	} | null>(null);

	const signUp = async (data: {
		email: string,
		password: string,
		wallet: string,
		name: string
	}): Promise<void> => {
		const response = await axios.post("http://localhost:3333/users", data)
		const { email, name, wallet } = await response.json();

		setAccount(wallet);
	}

	return (
		<AuthContext.Provider value={{ account, setAccount }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
