"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";

export const AuthContext = createContext({});

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [account, setAccount] = useState<SignUpData | null>(null);

	const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
		let endpoint: string;

		if (data.wallet == null && data.name == null) {
			endpoint = "/auth/signupGovernment";
		} else if (data.name == null && data.wallet) {
			endpoint = "/auth/signupUser";
		} else if (data.name && data.wallet) {
			endpoint = "/auth/signupCompany";
		} else {
			throw new Error("Invalid data, please check the fields");
		}

		const response: AxiosResponse<SignUpResponse> = await axios.post(
			endpoint,
			data
		);

		setAccount(response.data);

		console.log(response);

		return response.data;
	};

    const login = async (data: SignUpData): Promise<SignUpResponse> => {
        // @Post('login')
        // async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
        //     const jwt = await this.authService.login(body.email, body.password);
        //     res.cookie('jwt', jwt, { httpOnly: false });
        //     return { jwt };
        // }
        let endpoint = "/auth/login";
    }

	return (
		<AuthContext.Provider value={{ account, signUp }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
