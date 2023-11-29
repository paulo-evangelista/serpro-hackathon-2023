import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { IsGovernment } from 'src/auth/auth.guard';
import { CreateAssetDto } from './dtos/deploy-new-asset.dto';

// @UseGuards(IsGovernment)
@Controller('government')
export class GovernmentController {
    constructor(private readonly governmentService: GovernmentService) {}

    @Get('approveCompany/:id')
    async aproveCompany(@Param('id') id: any, @Req() req: Request) {
        return await this.governmentService.aproveCompany(id, req['user'].id);
    }

    @Get('getAllCompanies')
    async getAllCompanies() {
        return await this.governmentService.getAllCompanies();
    }

    @Get('getAllApprovedCompanies')
    async getAllApprovedCompanies() {
        return await this.governmentService.getAllApprovedCompanies();
    }

    @Post('deployNewAsset')
    async deployNewAsset(@Body() assetData: CreateAssetDto) {
        try {
            const newAsset = await this.governmentService.deployNewAsset(assetData);
            return newAsset;
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    @Get('getAllAssets')
    async getAllAssets() {
        return await this.governmentService.getAllAssets();
    }

    // pagar todos os investimentos no fim de um contrato
    @Get('liquidateAsset/:id')
    async liquidateAsset(@Param('id') id: any) {
        // return await this.governmentService.liquidateAsset(id);
    }
}
