import { Injectable, Inject } from '@nestjs/common';
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
}
