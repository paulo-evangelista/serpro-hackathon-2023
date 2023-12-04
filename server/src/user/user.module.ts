import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Web3Module } from 'src/web3/web3.module';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';
import { Company } from 'src/entities/company.entity';
import { Investment } from 'src/entities/investment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Asset_Pre_I, Company, Investment]), Web3Module],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
