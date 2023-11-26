import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';
import { Company } from 'src/entities/company.entity';
import { Government_User } from 'src/entities/government_user.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GovernmentService {
    constructor(
        @InjectRepository(Government_User)
        private readonly governmentUserRepository: Repository<Government_User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(Asset_Pre_I)
        private readonly assetPreIRepository: Repository<Asset_Pre_I>,
    ) {}

    async aproveCompany(userId: number, govId: number) {

        // TODO: DEPLOYAR O CONTRATO DE EMPRESA.

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

    async getAllAssets(){
        return await this.assetPreIRepository.find();
}}
