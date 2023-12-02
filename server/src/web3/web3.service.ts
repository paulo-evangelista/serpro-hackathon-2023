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

let ipcaData: {
    value: {
        ipca: any; // bigint | number;
        yearMonth: string;
    };
    timestamp: number;
    transactionHash: string;
} | null = null;
// } = {
//     value: {
//         ipca: 0,
//         yearMonth: '',
//     },
//     timestamp: 0,
//     transactionHash: '',
// };

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
    }

    buyAsset = async (contractAddress: HexString, userAddress: HexString, userPayables: number, financialAmount: number, ipfsUri: string) => {
        try {
            const publicTitleContract = new ethers.Contract(contractAddress, this.publicTitleAbi, this.wallet);

            const tx = await publicTitleContract.safeMint(userAddress, financi alAmount, userPayables, ipfsUri);

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

        const response = await axios.request(options).catch(function (error) {
            console.log(error);
            throw new InternalServerErrorException('pinata upload error');
        });
        return response.data.IpfsHash as string;
    };

    deployNewAsset = async ({ titleName, titleSymbol, annualProfitability, unitPrice, program, lobby, launchDate, expirationDate, amount, financialAmount, accountOpening }: CreateAssetDto) => {
        try {
            const factory = new ethers.ContractFactory(this.publicTitleAbi, this.publicTitleBytecode, this.wallet);
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

            console.log('Contrato:', contract);
            console.log('Endereço contrato deployado:', contract.target);
            setTimeout(() => {
                console.log('verifying...');
                verifyContract([titleName, titleSymbol, annualProfitability, unitPrice, program, lobby, launchDate, expirationDate, amount, financialAmount, accountOpening, this.drexAddress]);
            }, 5000);
            return contract.target as string;
        } catch (error) {
            console.error('Erro ao fazer o deploy do contrato:', error);
        }
    };

    mintDrex = async (wallet: string, amount: number) => {
        const tx = await this.drexContract.mint(wallet, amount);
        const receipt: TransactionReceipt = await tx.wait();
        return receipt.hash;
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
}
