import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Repository } from 'typeorm';
import { VitalEntity } from './vitals.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VitalsWorkerService {
    private readonly logger = new Logger(VitalsWorkerService.name);

    constructor(
        @InjectRepository(VitalEntity)
        private readonly vitalsRepository: Repository<VitalEntity>,
    ) {}
    
    @RabbitSubscribe({
        exchange: 'vitals_exchange',
        routingKey: 'vitals.created',
        queue: 'vitals_queue',
    })
    public async handleNewVitalMessage(message: any) {
        this.logger.log(`Received vital message: ${JSON.stringify(message)}`);
        
        if (this.isValidVitalMessage(message)) {
            try {
                this.logger.log(`Processing vital for patient ${message.patient_id}: HR=${message.heart_rate}, BP=${message.bp}`);
                const newVital = this.vitalsRepository.create(message);
                await this.vitalsRepository.save(newVital);
                this.logger.log(`Vital saved successfully: ${JSON.stringify(newVital)}`);
            } catch (error) {
                this.logger.error(`Error processing vital message: ${error.message}`);
            }
        } else {
            this.logger.warn(`Received invalid vital message, ignoring: ${JSON.stringify(message)}`);
        }
    }
    
    private isValidVitalMessage(message: any): boolean {
        return message && 
               typeof message.patient_id === 'string' && 
               typeof message.heart_rate === 'number' && 
               typeof message.bp === 'string' &&
               message.patient_id.length > 0;
    }
}