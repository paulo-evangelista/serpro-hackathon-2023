import { Body, Controller, Post, UseGuards, Get, Request, Res, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsUser, IsAdmin } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body: any) {
      console.log(body)
        return await this.authService.signup(body);
    }

    @Post('login')
    async login(@Body() body: any, @Res({passthrough: true}) res: Response) {
        const jwt = await this.authService.login(body.email, body.password);
        res.cookie('jwt', jwt, { httpOnly: false });
        return {jwt}
    }

    @UseGuards(IsUser)
    @Get("test")
    async test() {
        return "You passed the auth guard!";
    }

    @UseGuards(IsAdmin)
    @Get("testAdmin")
    async test2() {
        return "You passed the admin auth guard!";
    }

    @Get("makeAdmin/:id")
    async makeAdmin(@Param('id') id: number) {
        return await this.authService.makeAdmin(id);

    }
}
