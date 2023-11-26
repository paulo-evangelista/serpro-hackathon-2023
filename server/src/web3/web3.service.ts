import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
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
}
