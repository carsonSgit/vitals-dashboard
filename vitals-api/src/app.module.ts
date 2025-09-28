import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { VitalsModule } from './vitals/vitals.module';

@Module({
  imports: [PatientsModule, VitalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
