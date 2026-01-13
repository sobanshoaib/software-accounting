import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EmployeeService {

    private prisma = new PrismaClient();

    async addEmployee(data: any) {
        
        const fixedData = {
            ...data,
            dateBirth: new Date(data.dateBirth)
        }
        
        return this.prisma.employee.create({data: fixedData});
    }
}
