import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Web3Module } from 'src/web3/web3.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), Web3Module],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
