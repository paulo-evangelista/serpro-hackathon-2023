import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';
import { Company } from 'src/entities/company.entity';
import { Government_User } from 'src/entities/government_user.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dtos/deploy-new-asset.dto';
import { calculateCompoundInterest } from 'src/utils/utils';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class GovernmentService {
    constructor(
        @Inject(Web3Service) private readonly web3service: Web3Service,
        @InjectRepository(Government_User)
        private readonly governmentUserRepository: Repository<Government_User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(Asset_Pre_I)
        private readonly assetPreIRepository: Repository<Asset_Pre_I>,
    ) {}

    async aproveCompany(userId: number, govId: number) {

        const companyEntrie = await this.companyRepository.findOne({ where: { id: userId } });

        if (!companyEntrie) {
            throw new Error('Empresa não encontrada');
        }

        const govEntrie = await this.governmentUserRepository.findOne({ where: { id: govId } });

        if (!govEntrie) {
            throw new Error('Usuário do governo não encontrado');
        }

        companyEntrie.approved_by = govEntrie;
        companyEntrie.is_aproved = true;

        return await this.companyRepository.save(companyEntrie);
    }

    async getAllAssets() {
        return await this.assetPreIRepository.find();
    }

    async deployNewAsset(assetData: CreateAssetDto) {

        return this.web3service.deployNewAsset(assetData);
    }
    
    async getAllCompanies() {
        return await this.companyRepository.find();
    }

    async getAllApprovedCompanies() {
        return await this.companyRepository.find({ where: { is_aproved: true } });
    }
}
