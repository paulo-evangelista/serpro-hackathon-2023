import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { IsGovernment } from 'src/auth/auth.guard';

@UseGuards(IsGovernment)
@Controller('government')
export class GovernmentController {
  constructor(private readonly governmentService: GovernmentService) {}

  @Get("approveCompany/:id")
  async aproveCompany(@Param("id") id: any) {
    return await this.governmentService.aproveCompany(id);
  }

  @Post("deployNewAsset")
  async deployNewAsset(@Body() body: any) {
    return await this.governmentService.deployNewAsset();
  }

  @Get("getAllAssets")
  async getAssets() {
    return await this.governmentService.getAssets();
  }

  // pagar todos os investimentos no fim de um contrato
  @Get("liquidateAsset/:id")
  async liquidateAsset(@Param("id") id: any) {
    return await this.governmentService.liquidateAsset(id);
  }
}
