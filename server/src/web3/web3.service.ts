import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Transaction, TransactionReceipt, TransactionRequest, ethers } from 'ethers';
import axios, { AxiosRequestConfig } from 'axios';
import { randomBytes } from 'crypto';
import { HexString } from 'ethers/lib.commonjs/utils/data';
import PublicTitleInfo from './ABIs/PublicTitle';
import drexAbi from './ABIs/drexAbi';
import { CreateAssetDto } from 'src/government/dtos/deploy-new-asset.dto';
import { verifyContract } from 'src/utils/utils';
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

    constructor() {
        this.provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_APIKEY);
        this.wallet = new ethers.Wallet(process.env.GOV_PK, this.provider);
        this.publicTitleAbi = PublicTitleInfo.abi;
        this.publicTitleBytecode = PublicTitleInfo.bytecode;
        this.drexAddress = '0xa614F4E4F595E826Bff3E69534211EDF820782Ad';
        this.drexAbi = drexAbi;
        this.drexContract = new ethers.Contract(this.drexAddress, this.drexAbi, this.wallet);
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
                console.log("verifying...")
                verifyContract([titleName, titleSymbol, annualProfitability, unitPrice, program, lobby, launchDate, expirationDate, amount, financialAmount, accountOpening, this.drexAddress]);
            }, 5000);
            return contract.target;
        } catch (error) {
            console.error('Erro ao fazer o deploy do contrato:', error);
        }
    };

    mintDrex = async (wallet: string, amount: number) => {
        const tx = await this.drexContract.mint(wallet, amount);
        const receipt: TransactionReceipt = await tx.wait();
        return receipt.hash;
    };
}
