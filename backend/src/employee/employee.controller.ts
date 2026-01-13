import { Post, Controller, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { AddEmployeeDto } from './dto/add-employee.dto';

@Controller('employee')
export class EmployeeController {
    
    constructor(private readonly service: EmployeeService) {}

    @Post('add-employee')
    async addEmployee(
        @Body() body: AddEmployeeDto 
    ) {
        return this.service.addEmployee(body)
    }
}
