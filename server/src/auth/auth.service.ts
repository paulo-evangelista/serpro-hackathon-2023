import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ){}
    async signup({email, password, document, wallet, firstName, lastName}) {
        
        const user = await this.userRepository.findOne({where: {email: email}})
        if (user) {
            throw new BadRequestException('User already exists');
        }
        
        return await this.userRepository.save({
            email, password, document, wallet, firstName, lastName
        });
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({where: {email: email}})

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (user.password !== password) {
            throw new UnauthorizedException('Password is incorrect');
        }
        
        const payload = { sub: user.id, username: user.email, role: "user" };

        if (user.is_admin) payload.role = "admin";


    return await this.jwtService.signAsync(payload)

    }

    async makeAdmin(id: number) {
        const user = await this.userRepository.findOne({where: {id: id}})
        if (!user) {
            throw new BadRequestException('User not found');
        }
        user.is_admin = true;
        return await this.userRepository.save(user);
    }
}
