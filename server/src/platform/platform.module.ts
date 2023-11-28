import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Asset_Pre_I])],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
