import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientEntity } from './patients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [TypeOrmModule.forFeature([PatientEntity])],
})
export class PatientsModule {}
