import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PaymentSettingsService {
    private prisma = new PrismaClient();

    async getPaymentSettingId() {
        const paymentSettings = await this.prisma.paymentSetting.findMany();
        let maxNum = 0;
        for (const payment of paymentSettings) {
            const idParts = payment.id.split("_");
            const numPart = parseInt(idParts[2]);
            if (!isNaN(numPart) && numPart > maxNum) {
                maxNum = numPart;
            }
        }

        const nextnumber = maxNum + 1;
        const formatted = String(nextnumber).padStart(4, '0');
        return `Payment_Setting_${formatted}`;
    }

    async addPaymentSetting(data: any) {

        const id = await this.getPaymentSettingId();
        
        const fixedData = {
            ...data,
            id,
            paymentLastDate: new Date(data.paymentLastDate)
        }
        
        return this.prisma.paymentSetting.create({data: fixedData});
    }

    async getAllPayments() {
        return this.prisma.paymentSetting.findMany()
    }

    async getTimedPayments() {

        const now = new Date();
        
        const startOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const startOfTomorrow = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        );

        return this.prisma.paymentSetting.findMany({
            where: {
                paymentLastDate: {
                    gte: startOfToday,
                    lte: startOfTomorrow,
                },
            },
        });

    }
}
