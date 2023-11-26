import { Module } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { GovernmentController } from './government.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Government_User } from 'src/entities/government_user.entity';
import { Company } from 'src/entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Government_User, Company])],
    controllers: [GovernmentController],
    providers: [GovernmentService],
})
export class GovernmentModule {}
