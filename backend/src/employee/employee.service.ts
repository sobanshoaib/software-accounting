import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EmployeeService {

    private prisma = new PrismaClient();

    async getEmployeeId() {
        const employees = await this.prisma.employee.findMany();
        let maxNum = 0;
        for (const employee of employees) {
            const idParts = employee.id.split("-");
            const numPart = parseInt(idParts[2]);
            if (!isNaN(numPart) && numPart > maxNum) {
                maxNum = numPart;
            }
        }

        const nextnumber = maxNum + 1;
        const formatted = String(nextnumber).padStart(4, '0');
        return `Employee_${formatted}`;
    }

    async addEmployee(data: any) {
        
        const fixedData = {
            ...data,
            dateBirth: new Date(data.dateBirth)
        }
        
        return this.prisma.employee.create({data: fixedData});
    }

    async getAllEmployees() {
        return this.prisma.employee.findMany()
    }
}
