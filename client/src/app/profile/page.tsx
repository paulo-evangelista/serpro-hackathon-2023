"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi  from './abi.json';
import { Navbar } from '../components/Navbar';
import QRCode from 'qrcode.react';

const Profile = () => {
    const [balance, setBalance] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');

    useEffect(() => {
        async function getLinkBalance() {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                const address = await (await signer).getAddress();
                setCurrentAddress(address);
                
                const linkContractAddress = '0x779877A7B0D9E8603169DdbD7836e478b4624789';

                const linkContract = new ethers.Contract(linkContractAddress, abi, provider);

                let linkBalance = await linkContract.balanceOf(address);
                setBalance(linkBalance.toString());
            }
        }

        getLinkBalance();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto p-6 mt-24">
                <h1 className="text-3xl font-semibold mb-4">Seu Perfil</h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <p className="text-lg mb-2">Endereço atual: {currentAddress}</p>
                    <p className="text-lg">Saldo do Token LINK: {balance}</p>
                    {/* <p className="text-lg">Saldo do Token DREX: {balance}</p> */}
                </div>
                <div className="flex flex-col items-center">
                <p className="text-lg font-bold mt-24">Agora é mais fácil investir em títulos públicos!</p>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 mt-4">
                    <QRCode value="https://example.com" size={200} />
                </div>
                <p className="text-lg font-bold">Recarregue sua conta com PIX</p>
                <p className="text-lg font-bold text-gray-500 tracking-wide">
                    Fácil, rápido e confiável
                </p>
            </div>
            </div>
        </div>
    );
}

export default Profile;