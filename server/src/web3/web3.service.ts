import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ethers } from 'ethers';
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { randomBytes } from 'crypto';

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

    pinToIPFS = async (title: string, description: string, boughtTimestamp: number, endTimestamp: number, amount: number) => {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: 'https://api.pinata.cloud/data/testAuthentication',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                authorization: `Bearer  ${process.env.PINATA_JWT}`,
            },
            data: {
                pinataOptions: { cidVersion: 1 },
                pinataContent: {
                    image: 'https://ipfs.io/ipfs/bafybeidnoqa5xsxhwdaukibevsgvpz3vear6lk724ol5e3w7nkryz3gzc4',
                    name: title,
                    description: description,
                    attributes: [
                        {
                            display_type: 'date',
                            trait_type: 'Vencimento',
                            value: endTimestamp,
                        },
                        {
                            display_type: 'date',
                            trait_type: 'Adquirido em',
                            value: boughtTimestamp,
                        },
                        {
                            trait_type: 'Quantidade',
                            value: amount.toString(),
                        },
                    ],
                },
                pinataMetadata: { name: `serpro-hackas-${randomBytes(10).toString()}.json` },
            },
        };

        axios
            .request(options)
            .then(function (response) {
                return response.data.IpfsHash;
            })
            .catch(function (error) {
                console.log(error);
                throw new InternalServerErrorException('pinata upload error');
            });
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
