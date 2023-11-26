import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Government_User } from 'src/entities/government_user.entity';
import { Company } from 'src/entities/company.entity';
import { Web3Module } from 'src/web3/web3.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Government_User, Company]), Web3Module],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
