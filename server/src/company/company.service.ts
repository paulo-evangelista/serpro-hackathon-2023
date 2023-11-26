import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
    async approveUser() {
        return 'ok';
    }
}
