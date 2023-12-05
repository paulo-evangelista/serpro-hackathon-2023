import { Body, Controller, Get, Post, Req, UseGuards, Param, ParseIntPipe, ParseFloatPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { IsUser } from 'src/auth/auth.guard';
import { Request } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(IsUser)
    @Get('getAll')
    async getAll() {
        return await this.userService.getAll();
    }

    @UseGuards(IsUser)
    @Post('newInvestment')
    async consolidateInvest(@Body() body: any, @Req() request: Request) {
        return await this.userService.newInvestment(request['user'].sub, body.assetId, body.financialAmount);
    }

    @UseGuards(IsUser)
    @Get('getOracleData')
    async getOracleData() {
        return await this.userService.getOracleData();
    }

    @UseGuards(IsUser)
    @Get('reloadOracleData')
    async reloadOracleData() {
        return await this.userService.reloadOracleData();
    }

    @Get('dataFeed/:amount')
    async getDataFeed(@Param('amount', ParseFloatPipe) amount: number) {
        return await this.userService.getDataFeed(amount);
    }

    @Get(':userId/investments')
    async getUserInvestments(@Param('userId', ParseIntPipe) userId: number) {
        return await this.userService.getUserInvestments(userId);
    }
}
