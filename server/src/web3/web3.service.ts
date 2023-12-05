import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TransactionReceipt, ethers } from 'ethers';
import axios, { AxiosRequestConfig } from 'axios';
import { randomBytes } from 'crypto';
import { HexString } from 'ethers/lib.commonjs/utils/data';
import PublicTitleInfo from './ABIs/PublicTitle';
import drexAbi from './ABIs/drexAbi';
import { CreateAssetDto } from 'src/government/dtos/deploy-new-asset.dto';
import { sleep, verifyContract } from 'src/utils/utils';
import oracleAbi from './ABIs/oracleAbi';
import dataFeedAbi from './ABIs/dataFeedAbi';

let ipcaData: {
    value: {
        ipca: any; // bigint | number;
        yearMonth: string;
    };
    timestamp: number;
    transactionHash: string;
} | null = null;

@Injectable()
export class Web3Service {
    private provider: ethers.InfuraProvider;
    private wallet: ethers.Wallet;
    private contract: ethers.Contract;
    private publicTitleAbi: any;
    private publicTitleBytecode: any;
    private drexAddress: HexString;
    private drexAbi: any;
    private drexBytecode: any;
    private drexContract: ethers.Contract;
    private oracleAbi: any;
    private oracleAddress: HexString;
    private oracleContract: ethers.Contract;
    private dataFeedAbi: any;
    private dataFeedAddress: HexString;
    private dataFeedContract: ethers.Contract;

    constructor() {
        this.provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_APIKEY);
        this.wallet = new ethers.Wallet(process.env.GOV_PK, this.provider);
        this.publicTitleAbi = PublicTitleInfo.abi;
        this.publicTitleBytecode = PublicTitleInfo.bytecode;
        this.drexAddress = '0xa614F4E4F595E826Bff3E69534211EDF820782Ad';
        this.drexAbi = drexAbi;
        this.drexContract = new ethers.Contract(this.drexAddress, this.drexAbi, this.wallet);
        this.oracleAbi = oracleAbi; // lembra de preenhcer la no orcaleAbi.ts!!
        this.oracleAddress = '0x7AD5D09c204E61aFB33fd1126acC3f5ABd140171'; // lembra de colocar o endereço do oracle aqui!!
        this.oracleContract = new ethers.Contract(this.oracleAddress, this.oracleAbi, this.wallet);
        this.dataFeedAbi = dataFeedAbi;
        this.dataFeedAddress = '0x6cE9bc679E5E904A0aC3975fdA978576c0601fd7';
        this.dataFeedContract = new ethers.Contract(this.dataFeedAddress, this.dataFeedAbi, this.wallet);
    }

    buyAsset = async (contractAddress: HexString, userAddress: HexString, userPayables: number, financialAmount: number, ipfsUri: string) => {
        try {
            const publicTitleContract = new ethers.Contract(contractAddress, this.publicTitleAbi, this.wallet);

            const tx = await publicTitleContract.safeMint(userAddress, financialAmount, userPayables, ipfsUri);

            const receipt = await tx.wait();
            console.log('Transação enviada:', receipt);

            return receipt.hash;
        } catch (error) {
            console.error('Erro ao comprar o ativo:', error);
        }
    };

    createWallet() {
        const wallet = ethers.Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
        };
    }

    pinToIPFS = async (title: string, description: string, boughtTimestamp: number, endTimestamp: number, amount: number) => {
        const options: AxiosRequestConfig = {
            method: 'POST',
            // url: 'https://api.pinata.cloud/data/testAuthentication',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                // authorization: `Bearer  ${process.env.PINATA_JWT}`,
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0OWI5YzY4My0zZjRhLTRkNjUtYWYwMS03YWZhY2RiNGNlYTUiLCJlbWFpbCI6InBhdWxvLmV2YW5nZWxpc3RhQHNvdS5pbnRlbGkuZWR1LmJyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk5NmU2YzIzODJiYmY2MDhmZTgwIiwic2NvcGVkS2V5U2VjcmV0IjoiZDQyY2ZjYmVjNzJhNTcwNzY0ZDZlYzM0ZmIwYWY3ODIzMGZiNGY3NjIyZWYxMTU1ZTEyZTViMTZmN2YyOTA2YSIsImlhdCI6MTcwMTcwMjU0M30.qtLzQA_SvZ6XDetUPXWVSrl5DWtXApGwzX_EIUQeh-E`,
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

        const response = await axios.request(options).catch(function (error) {
            console.log(error);
            throw new InternalServerErrorException('pinata upload error');
        });
        console.log(response.data);
        return response.data.IpfsHash as string;
    }; 

    deployNewAsset = async ({ titleName, titleSymbol, annualProfitability, unitPrice, program, lobby, launchDate, expirationDate, amount, financialAmount, accountOpening }: CreateAssetDto) => {
        try {
            console.log('Starting contract deployment...');

            const factory = new ethers.ContractFactory(this.publicTitleAbi, this.publicTitleBytecode, this.wallet);
            console.log('Factory created:', factory);

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
                financialAmount,
                accountOpening,
                this.drexAddress,
            );

            console.log('Contract deployed:', contract);
            console.log('Deployed contract address:', contract.target);

            // try {
            //     console.log('Starting contract verification...');
            //     verifyContract([titleName, titleSymbol, annualProfitability, unitPrice, program, lobby, launchDate, expirationDate, amount, financialAmount, accountOpening, this.drexAddress]);
            // } catch (error) {
            //     console.error('Error verifying contract:', error);
            // }

            return contract.target as string;
        } catch (error) {
            console.error('Error deploying contract:', error);
        }
    };

    mintDrex = async (wallet: string, amount: number) => {
        const tx = await this.drexContract.mint(wallet, amount);
        const receipt: TransactionReceipt = await tx.wait();
        return receipt.hash;
    };

    reloadIPCA = async () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month: number | string = currentDate.getMonth();
        const currentYearMonth = `${year}-${month}`;

        const ipcaValue = await this.oracleContract.getResponse();

        if (month < 10) {
            month = String(`0${month}`);
        }

        if (ipcaData && ipcaData.value.yearMonth === currentYearMonth) {
            console.log('IPCA cacheado:', ipcaData);
            return ipcaData;
        }

        const parsedIpcaValue = ethers.formatUnits((await this.oracleContract.getResponse()).toString(), 18);

        if (ipcaValue != '0') {
            ipcaData = {
                value: {
                    ipca: parsedIpcaValue,
                    yearMonth: currentYearMonth,
                },
                transactionHash: ipcaData && ipcaData.transactionHash ? ipcaData.transactionHash : '0x0000000000000000000000000000000000000000',
                timestamp: Date.now(),
            };
        }
    };

    requestIPCA = async () => {
        console.log('\nStarting requestIPCA...');
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month: number | string = currentDate.getMonth() + 1;
        const currentYearMonth = `${year}-${month}`;

        // if ((ipcaData && ipcaData.timestamp + 1000 * 60 * 60 * 24 > Date.now()) || (ipcaData && ipcaData.value.yearMonth === currentYearMonth)) {
        //     console.log('IPCA cacheado:', ipcaData);
        //     return ipcaData;
        // }

        if (month < 10) {
            console.log('\nYearMonth:', `${year}-0${month}`);
            month = String(`0${month}`);
        }

        const isResponseZero = ethers.formatUnits((await this.oracleContract.getResponse()).toString(), 18);
        console.log('\nResponse from oracleContract:', isResponseZero);
        if (isResponseZero !== '0' && ipcaData && ipcaData.value.yearMonth === currentYearMonth) {
            console.log('IPCA cacheado:', ipcaData);
            return ipcaData;
        }

        try {
            console.log('\nSending request to oracleContract...');
            const tx = await this.oracleContract.request(`${year}-${month}`);

            console.log('\nWaiting for transaction receipt...');

            const receipt = await tx.wait();

            console.log('\nTransação enviada:', receipt);

            // 5 seconds delay
            console.log('\nSleeping for 5 seconds...');
            await sleep(5000);

            // response is a bigInt of 18 decimals, parseUnits converts it to a bigInt of 0 decimals
            console.log('\nGetting response from oracleContract...');
            const response = ethers.formatUnits((await this.oracleContract.getResponse()).toString(), 18);

            console.log('\nResposta do Oracle:', response);

            console.log('\nTransação enviada:', receipt.hash);

            if (response != '0') {
                ipcaData = {
                    value: {
                        ipca: response,
                        yearMonth: currentYearMonth,
                    },
                    transactionHash: receipt.hash,
                    timestamp: Date.now(),
                };

                return ipcaData;
            }

            return ipcaData;
        } catch (error) {
            console.error('\nErro ao fazer a requisição do IPCA:', error);

            return {
                value: {
                    ipca: 0,
                    yearMonth: currentYearMonth,
                },
                transactionHash: '0x0000000000000000000000000000000000000000',
                timestamp: Date.now(),
            };
        }
    };

    liquidateContract = async (contractAddress: HexString, abi: any) => {
        try {
            const publicTitleContract = new ethers.Contract(contractAddress, abi, this.wallet);

            const tx = await publicTitleContract.liquidate();

            const receipt = await tx.wait();
            console.log('Transação liquidate enviada:', receipt);

            return receipt.hash;
        } catch (error) {
            console.error('Erro ao liquidar o contrato:', error);
        }
    };

    getDataFeed = async (brlAmount: number) => {
        const response = await this.dataFeedContract.getChainlinkDataFeedLatestAnswer();
        const ethInUsd = parseFloat(ethers.formatUnits(response, 8)); // Make sure this is the correct conversion rate

        const brlConversionRate /* 10968,73 BRL = 1 ETH */ = 0.0000911682574; // 1 BRL = 0.0000911682574 ETH

        const ethAmount = brlAmount * brlConversionRate; // 1000 * 0.0000911682574 = 0.0911682574
        const usdAmount = ethAmount * ethInUsd; // 0.0911682574 * 2222,16 = 202,58

        return {
            dataFeed: String(response),
            brlAmount,
            usdAmount,
        };
    };
}
