import { Body, Controller, Post, UseGuards, Get, Request, Res, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsUser, IsGovernment, IsCompany } from './auth.guard';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signupCompany')
    async signupCompany(@Body() body: any) {
        console.log(body);
        return await this.authService.signupCompany(body.email, body.password, body.wallet, body.name);
    }

    @Post('signupGovernment')
    async signupGovernment(@Body() body: any) {
        console.log(body);
        return await this.authService.signupGovernment(body.email, body.password, body.firstName, body.lastName);
    }

    @Post('signupUser')
    async signupUser(@Body() body: any) {
        console.log(body);
        return await this.authService.signupUser(body.email, body.password, body.wallet, body.firstName, body.lastName);
    }

    @Post('login')
    async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
        const jwt = await this.authService.login(body.email, body.password);
        console.log(jwt.jwt);

        res.cookie('jwt', jwt.jwt, { httpOnly: false });
        return jwt.jwt;
    }

    @UseGuards(IsUser)
    @Get('testUser')
    async test() {
        return 'You passed the auth guard!';
    }

    @UseGuards(IsCompany)
    @Get('testCompany')
    async test2() {
        return 'You passed the admin auth guard!';
    }

    @UseGuards(IsGovernment)
    @Get('testAdmin')
    async test3() {
        return 'You passed the company auth guard!';
    }
}
