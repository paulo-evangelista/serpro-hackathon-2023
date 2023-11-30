import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(Web3Service) private readonly web3service: Web3Service,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
}
