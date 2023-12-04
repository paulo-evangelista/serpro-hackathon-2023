import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Web3Module } from 'src/web3/web3.module';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Asset_Pre_I]), Web3Module],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
