import { Controller, Get, Param, Post, Put, Body, Delete } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { VitalEntity } from './vitals.entity';

@Controller('vitals')
export class VitalsController {
    constructor(private readonly vitalsService: VitalsService) {}

    @Get()
    findAllByPatientId(@Param('patientId') patientId: string) {
        return this.vitalsService.findAllByPatientId(patientId);
    }

    @Get(':id')
    findLatestByPatientId(@Param('patientId') patientId: string) {
        return this.vitalsService.findLatestByPatientId(patientId);
    }
    
    @Post()
    create(@Body() createVitalDto: VitalEntity) {
        return this.vitalsService.create(createVitalDto);
    }
}
