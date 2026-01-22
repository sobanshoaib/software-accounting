import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { PaymentSettingsModule } from './payment-settings/payment-settings.module';

@Module({
  imports: [EmployeeModule, PaymentSettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
