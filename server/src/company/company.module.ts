import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Government_User } from 'src/entities/government_user.entity';
import { User } from 'src/entities/user.entity';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Company, User, Asset_Pre_I, Government_User])],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}
