import { useContext } from "react";
import { ethers } from "ethers";
import { AuthContext } from "../context";

export const useMetamask = () => {
    const { account, setAccount } = useContext(AuthContext);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);

                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                console.log(accounts);

                const signer = provider.getSigner();
                const address = (await signer).address;
                setAccount(address);
                localStorage.setItem("isWalletConnected", "true");
            } catch (err) {
                console.error(err);
            }
        } else {
            alert(
                "Please install MetaMask 🦊! https://metamask.io/download.html"
            );
        }
    };

    return { account, connectWallet };
};
