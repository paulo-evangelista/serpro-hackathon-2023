import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { IsCompany } from 'src/auth/auth.guard';
import { Request } from 'express';
@UseGuards(IsCompany)
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get('approveUser/:id')
    async approveUser(@Param('id') id: any, @Req() req: Request) {
        return await this.companyService.approveUser(id, req['user'].sub);
    }
}
