import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'vitals_exchange',
          type: 'topic',
        },
      ],
      queues: [
        {
          name: 'vitals_queue',
          exchange: 'vitals_exchange',
          routingKey: 'vitals.created',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQConfigModule {}
