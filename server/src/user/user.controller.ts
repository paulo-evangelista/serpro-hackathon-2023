import { Body, Controller, Get, Post, Req, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
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
        // return await this.userService.consolidateInvest();
    }

    @UseGuards(IsUser)
    @Get('getOracleData')
    async getOracleData() {
        return await this.userService.getOracleData();
    }

    @Get(':userId/investments')
    async getUserInvestments(@Param('userId', ParseIntPipe) userId: number) {
        return await this.userService.getUserInvestments(userId);
    }
}
