import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IsUser } from 'src/auth/auth.guard';
import { Request } from '@nestjs/common';

@UseGuards(IsUser)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getAll')
    async getAll() {
        return await this.userService.getAll();
    }

    // Roda se o investimento foi aceito pelo contrato
    @Post('newInvestment')
    async consolidateInvest(@Body() body: any, @Req() request: Request) {
        // return await this.userService.consolidateInvest();
    }

    @Get('getOracleData')
    async getOracleData() {
        return await this.userService.getOracleData();
    }

}
