import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Web3Service } from 'src/web3/web3.service';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';
import { calculateCompoundInterest } from 'src/utils/utils';
@Injectable()
export class UserService {
    constructor(
        @Inject(Web3Service) private readonly web3service: Web3Service,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Asset_Pre_I)
        private readonly assetRepository: Repository<Asset_Pre_I>,
    ) {}

    async getAll() {
        return await this.userRepository.find();
    }

    async getOracleData() {
        return await this.web3service.requestIPCA();
    }

    async getUserInvestments(userId: number) {
        const user = await this.userRepository.find({
            where: { id: userId },
            relations: ['investments', 'investments.asset'],
        });

        if (!user || user.length === 0) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user[0].investments;
    }

    async newInvestment(userId: number, assetId: number, amount: number) {
        const userEntrie = await this.userRepository.findOne({ where: { id: userId } });
        if (!userEntrie) throw new NotFoundException('Usuário não encontrado');

        const assetEntrie = await this.assetRepository.findOne({ where: { id: assetId } });
        if (!assetEntrie) throw new NotFoundException('Ativo não encontrado');

        const nowTimestamp = Math.floor(+new Date() / 1000);
        const { payable } = calculateCompoundInterest(nowTimestamp, assetEntrie.deadline, amount, assetEntrie.interest / 100);

        const ipfsUri = await this.web3service.pinToIPFS(assetEntrie.name, 'NFT que comprova a compra e posse de um título do Tesouro Nacional', nowTimestamp, assetEntrie.deadline, amount);

        const tx = await this.web3service.buyAsset('0x5FbDB2315678afecb367f032d93F642f64180aa3', assetEntrie.address, 1, amount, ipfsUri);

        return { tx, payable };
    }
}
