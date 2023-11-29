import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Web3Service } from 'src/web3/web3.service';
import { Web3Module } from 'src/web3/web3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [Web3Module, TypeOrmModule.forFeature([User])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
