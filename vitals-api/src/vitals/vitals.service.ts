import { Injectable } from '@nestjs/common';
import { VitalEntity } from './vitals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class VitalsService {
    constructor(
        @InjectRepository(VitalEntity)
        private readonly vitalsRepository: Repository<VitalEntity>,
        private readonly amqpConnection: AmqpConnection,
    ) {}

    async create(vital: Partial<VitalEntity>) {
        const newVital = this.vitalsRepository.create(vital);
        const savedVital = await this.vitalsRepository.save(newVital);

        console.log('Publishing vital to RabbitMQ:', savedVital);
        this.amqpConnection.publish('vitals_exchange', 'vitals.created', savedVital);
        console.log('Published to vitals_exchange with routing key: vitals.created');

        return savedVital;
    }

    findAllByPatientId(patientId: string) {
        return this.vitalsRepository.find({ where: { patient_id: patientId }});
    }

    findLatestByPatientId(patientId: string) {
        return this.vitalsRepository.findOne({ where: { patient_id: patientId }, order: { created_at: 'DESC' }});
    }

}
