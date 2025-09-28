import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { VitalsModule } from './vitals/vitals.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'vitalsdb',
      entites: [PatientEntity, VitalEntity],
      synchronize: true,
    }),
    PatientsModule,
    VitalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
