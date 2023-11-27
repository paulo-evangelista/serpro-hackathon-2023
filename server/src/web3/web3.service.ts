import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import axios from 'axios';

@Injectable()
export class Web3Service {
    private provider: ethers.InfuraProvider;
    private wallet: ethers.Wallet;
    private contract: ethers.Contract;
    private contractAbi: any;
    constructor() {
        this.provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_APIKEY);

        this.wallet = new ethers.Wallet(process.env.GOV_PK, this.provider);
    }

    createWallet() {
        const wallet = ethers.Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
        };
    }

    sendFileToIPFS = async (file, counter) => {
        counter++;
    
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    pinata_api_key: "bf67cf4376213d9d9cb0", // `${process.env.REACT_APP_PINATA_API_KEY}`,
                    pinata_secret_api_key:
                        "5250eddb652c2e750bdf57d8ed79ee762564fed74c4ebfd78bb35dd4dbbe5a17", // `${process.env.REACT_APP_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            const fileHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
    
            const json = {
                name: "Profile Image" + counter.toString(),
                image: fileHash,
                attributes: [
                    {
                        "trait-type": "Stage" + counter.toString(),
                        value: counter.toString(),
                    },
                ],
            };
    
            return json, fileHash;
        }
    };

    deployContract = async (
        titleName: string,
        titleSymbol: string,
        annualProfitability: number,
        unitPrice: number,
        program: string,
        lobby: string,
        launchDate: number,
        expirationDate: number,
        amount: number,
        price: number,
        financialAmount: number,
        accountingOpening: string
    ) => {
            try {          
                const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_APIKEY)
                const wallet = new ethers.Wallet(process.env.GOV_PK, provider);
            
                const factory = new ethers.ContractFactory(abi, bytecode.bytecode, wallet);  // Pegar bytecode e abi!!!
                const contract = await factory.deploy(
                    titleName,
                    titleSymbol,
                    annualProfitability,
                    unitPrice,
                    program,
                    lobby,
                    launchDate,
                    expirationDate,
                    amount,
                    price,
                    financialAmount,
                    accountingOpening
                );
    
                console.log('Contrato:', contract);
                console.log('Endereço contrato deployado:', contract.target);
                return contract.target;
            } catch (error) {
                console.error('Erro ao fazer o deploy do contrato:', error);
            }
        };
}
