import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatformService } from './platform.service';


@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('getAllAssets')
  async getAllAssets() {
      return await this.platformService.getAllAssets();
  }
}
