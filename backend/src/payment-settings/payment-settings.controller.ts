import { Controller, Post, Get, Body } from '@nestjs/common';
import { PaymentSettingsService } from './payment-settings.service';
import { AddPaymentDto } from './dto/add-payment.dto';

@Controller('payment-settings')
export class PaymentSettingsController {

    constructor(private readonly service: PaymentSettingsService) {}

    @Post('add-payment')
    async addPaymentSetting(
        @Body() body: AddPaymentDto 
    ) {
        return this.service.addPaymentSetting(body)
    }

    @Get('list-payments')
    async getAllPayments() {
        return this.service.getAllPayments()
    }

    @Get('timed-payments')
    async getTimedPayments() {
        return this.service.getTimedPayments();
    }

}
