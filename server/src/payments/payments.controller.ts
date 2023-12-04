import { Controller, Get, Param, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}
    @Get('pix/:amount/:email')
    async pix(@Param() params: any) {
        return await this.paymentsService.pix(params.amount, params.email);
    }
}
