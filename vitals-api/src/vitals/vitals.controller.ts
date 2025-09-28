import { Controller, Get, Param, Post, Put, Body, Delete } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { VitalEntity } from './vitals.entity';

@Controller('vitals')
export class VitalsController {
    constructor(private readonly vitalsService: VitalsService) {}

    @Get()
    findAll() {
        return this.vitalsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vitalsService.findOne(id);
    }
    
    @Post()
    create(@Body() createVitalDto: VitalEntity) {
        return this.vitalsService.create(createVitalDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateVitalDto: VitalEntity) {
        return this.vitalsService.update(id, updateVitalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vitalsService.remove(id);
    }
}
