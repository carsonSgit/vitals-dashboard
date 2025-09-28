import { Injectable } from '@nestjs/common';
import { VitalEntity } from './vitals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VitalsService {
    constructor(
        @InjectRepository(VitalEntity)
        private readonly vitalsRepository: Repository<VitalEntity>,
    ) {}

    create(vital: Partial<VitalEntity>) {
        const newVital = this.vitalsRepository.create(vital);
        return this.vitalsRepository.save(newVital);
    }

    findAll() {
        return this.vitalsRepository.find();
    }

    findOne(id: string) {
        return this.vitalsRepository.findOne({ where: { id }});
    }

    update(id: string, vital: Partial<VitalEntity>) {
        return this.vitalsRepository.save({ ...vital, id });
    }
    
    remove(id: string) {
        return this.vitalsRepository.delete(id);
    }

}
