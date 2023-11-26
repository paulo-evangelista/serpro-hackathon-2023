import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { only } from 'node:test';
import { IsCompany } from 'src/auth/auth.guard';

@UseGuards(IsCompany)
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get('approveUser')
    async approveUser() {
        return await this.companyService.approveUser();
    }

    
}
