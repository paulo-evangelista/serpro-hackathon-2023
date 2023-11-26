import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getAll')
    async getAll() {
        return await this.userService.getAll();
    }

    // Faz os calculos necessários para o usuario chamar a função do contrato
    @Post('preInvest')
    async preInvest() {
        // return await this.userService.preInvest();
    }

    // Roda se o investimento foi aceito pelo contrato
    @Post('consolidateInvest')
    async consolidateInvest() {
        // return await this.userService.consolidateInvest();
    }
}
