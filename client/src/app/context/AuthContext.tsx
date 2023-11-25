"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [account, setAccount] = useState<string | null>(null);

	const connectWallet = async () => {
		if (window.ethereum) {
			try {
				const provider = new ethers.BrowserProvider(window.ethereum);

				const signer = provider.getSigner();
				const address = (await signer).address;
				setAccount(address);
				localStorage.setItem("isWalletConnected", "true");
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log("Please install Metamask");
		}
	};

	useEffect(() => {
		const isWalletConnected = localStorage.getItem("isWalletConnected");

		if (isWalletConnected) {
			connectWallet();
		}
	}, []);

	return (
		<AuthContext.Provider value={{ account, setAccount, connectWallet }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
