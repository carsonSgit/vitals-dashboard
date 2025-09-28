import { Module } from '@nestjs/common';
import { VitalsController } from './vitals.controller';
import { VitalsService } from './vitals.service';
import { VitalEntity } from './vitals.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQConfigModule } from '../rabbitmq/rabbitmq.module';

@Module({
  controllers: [VitalsController],
  providers: [VitalsService],
  imports: [
    TypeOrmModule.forFeature([VitalEntity]),
    RabbitMQConfigModule,
  ],

})
export class VitalsModule {}
