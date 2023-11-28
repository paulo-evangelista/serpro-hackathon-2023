import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset_Pre_I } from 'src/entities/asset-pre-i.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Asset_Pre_I)
    private readonly assetPreIRepository: Repository<Asset_Pre_I>,
  ){}

  async getAllAssets() {
    return await this.assetPreIRepository.find();
  }
}
