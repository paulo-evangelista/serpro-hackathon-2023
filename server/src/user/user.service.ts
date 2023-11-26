import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    @Get('all')
    async getAll() {
        return 'all users';
    }
}
