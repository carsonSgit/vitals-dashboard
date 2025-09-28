import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientEntity } from './patients.entity';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Get()
    findAll() {
        return this.patientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.patientsService.findOne(id);
    }

    @Post()
    create(@Body() createPatientDto: PatientEntity) {
        return this.patientsService.create(createPatientDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePatientDto: PatientEntity) {
        return this.patientsService.update(id, updatePatientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.patientsService.remove(id);
    }
}
