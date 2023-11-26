import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Government_User } from 'src/entities/government_user.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async approveUser(userId: number, govId: number) {
        // TODO: CHAMAR O CONTRATO  PARA APROVAR USUARIO.

        const companyEntrie = await this.companyRepository.findOne({ where: { id: govId }, relations: ['approved_users'] });

        console.log(companyEntrie);

        if (!companyEntrie) {
            throw new Error('usuario do governo não encontrado');
        }

        const userEntrie = await this.userRepository.findOne({ where: { id: userId } });

        if (!userEntrie) {
            throw new Error('Usuário do governo não encontrado');
        }

        if (!companyEntrie.approved_users) {
            companyEntrie.approved_users = [];
        }

        companyEntrie.approved_users.push(userEntrie);

        return await this.companyRepository.save(companyEntrie);
    }

    async getAllAssets() {
        return await this.companyRepository.find();
    }
}
