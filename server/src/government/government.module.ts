import { Module } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { GovernmentController } from './government.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Government_User } from 'src/entities/government_user.entity';
import { Company } from 'src/entities/company.entity';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';
import { Web3Module } from 'src/web3/web3.module';

@Module({
    imports: [TypeOrmModule.forFeature([Government_User, Company, Asset_Pre_I, Web3Module]), Web3Module],
    controllers: [GovernmentController],
    providers: [GovernmentService],
})
export class GovernmentModule {}
