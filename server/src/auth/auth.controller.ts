import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsUser, IsAdmin } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body: any) {
      console.log(body)
        return await this.authService.signup(body);
    }

    @Post('login')
    async login(@Body() body: any) {
        return await this.authService.login(body.email, body.password);
    }

    @UseGuards(IsAdmin)
    @Get("test")
    async test() {
        return "You passed the admin auth guard!";
    }

    @UseGuards(IsUser)
    @Get("test")
    async test2() {
        return "You passed the user auth guard!";
    }
}
