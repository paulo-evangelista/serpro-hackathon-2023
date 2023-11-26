import { Module } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { GovernmentController } from './government.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Government_User } from 'src/entities/government_user.entity';
import { Company } from 'src/entities/company.entity';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Government_User, Company, Asset_Pre_I])],
    controllers: [GovernmentController],
    providers: [GovernmentService],
})
export class GovernmentModule {}
