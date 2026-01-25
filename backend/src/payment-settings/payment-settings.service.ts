import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PaymentSettingsService {
    private prisma = new PrismaClient();

    async getPaymentSettingId() {
        const paymentSettings = await this.prisma.paymentSetting.findMany();
        let maxNum = 0;
        for (const payment of paymentSettings) {
            const idParts = payment.id.split("-");
            const numPart = parseInt(idParts[2]);
            if (!isNaN(numPart) && numPart > maxNum) {
                maxNum = numPart;
            }
        }

        const nextnumber = maxNum + 1;
        const formatted = String(nextnumber).padStart(4, '0');
        return `Payment_Setting_${formatted}`;
    }
}
