import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Government_User } from 'src/entities/government_user.entity';
import { Company } from 'src/entities/company.entity';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Government_User)
        private readonly governmentRepository: Repository<Government_User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        private jwtService: JwtService,
        private web3Service: Web3Service,
    ) {}

    async signupUser(email: string, password: string, wallet: string, firstName: string, lastName: string) {
        await this.checkIfUserExists(email);

        if (!wallet) {
            const { address, privateKey } = this.web3Service.createWallet();
            const entrie = this.userRepository.create({
                email,
                password,
                wallet: address,
                private_key: privateKey,
                firstName,
                lastName,
            });
            return await this.userRepository.save(entrie);
        }

        const entrie = this.userRepository.create({
            email,
            password,
            wallet,
            firstName,
            lastName,
        });

        if (!wallet) {
            const { newWallet, pk } = await this.createWallet();

            console.log('Generated wallet: ', newWallet, pk);

            entrie = this.userRepository.create({
                email,
                password,
                wallet: newWallet,
                firstName,
                lastName,
            });
        }

        return await this.userRepository.save(entrie);
    }

    async signupCompany(email: string, password: string, wallet: string, name: string) {
        await this.checkIfUserExists(email);

        const entrie = this.companyRepository.create({
            wallet,
            email,
            password,
            name,
        });

        return await this.companyRepository.save(entrie);
    }

    async signupGovernment(email: string, password: string, firstName: string, lastName: string) {
        await this.checkIfUserExists(email);

        const entrie = this.governmentRepository.create({
            email,
            password,
            firstName,
            lastName,
        });

        return await this.governmentRepository.save(entrie);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        if (user) {
            if (user.password !== password) throw new UnauthorizedException('Password is incorrect');
            const payload = { sub: user.id, email: user.email, role: 'user' };
            return { jwt: await this.jwtService.signAsync(payload), ...user };
        }
        const government = await this.governmentRepository.findOne({
            where: { email: email },
        });
        if (government) {
            if (government.password !== password) throw new UnauthorizedException('Password is incorrect');
            const payload = {
                sub: government.id,
                email: government.email,
                role: 'government',
            };
            return { jwt: await this.jwtService.signAsync(payload), ...government };
        }
        const company = await this.companyRepository.findOne({
            where: { email: email },
        });
        if (company) {
            if (company.password !== password) throw new UnauthorizedException('Password is incorrect');
            const payload = {
                sub: company.id,
                email: company.email,
                role: 'company',
            };
            return { jwt: await this.jwtService.signAsync(payload), ...company };
        }

        throw new UnauthorizedException('User not found');
    }

    async checkIfUserExists(email: string) {
        const userExists = await this.userRepository.findOne({
            where: { email: email },
        });
        if (userExists) {
            throw new BadRequestException('email already exists on table user');
        }
        const governmentExists = await this.governmentRepository.findOne({
            where: { email: email },
        });
        if (governmentExists) {
            throw new BadRequestException('email already exists on table government_user');
        }
        const companyExists = await this.companyRepository.findOne({
            where: { email: email },
        });
        if (companyExists) {
            throw new BadRequestException('email already exists on table company');
        }
    }
}
