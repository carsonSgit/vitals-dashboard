import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { VitalsModule } from './vitals/vitals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './patients/patients.entity';
import { VitalEntity } from './vitals/vitals.entity';
import { RabbitMQConfigModule } from './rabbitmq/rabbitmq.module';
import { VitalsWorkerService } from './vitals/vitals.worker.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'vitalsdb',
      entities: [PatientEntity, VitalEntity],
      synchronize: true,
    }),
    RabbitMQConfigModule,
    PatientsModule,
    VitalsModule,
    TypeOrmModule.forFeature([VitalEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, VitalsWorkerService],
})
export class AppModule {}
