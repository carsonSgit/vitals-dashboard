import { Injectable } from '@nestjs/common';
import { PatientEntity } from './patients.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(PatientEntity)
        private readonly patientsRepository: Repository<PatientEntity>,
    ) {}

    create(patient: Partial<PatientEntity>) {
        const newPatient = this.patientsRepository.create(patient);
        return this.patientsRepository.save(newPatient);
    }

    findAll() {
        return this.patientsRepository.find();
    }

    findOne(id: string) {
        return this.patientsRepository.findOne({ where: { id }});
    }

    update(id: string, patient: Partial<PatientEntity>) {
        return this.patientsRepository.save({ ...patient, id });
    }

    remove(id: string) {
        return this.patientsRepository.delete(id);
    }
}
