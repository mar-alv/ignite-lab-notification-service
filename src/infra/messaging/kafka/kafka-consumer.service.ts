import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['full-leech-10985-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZnVsbC1sZWVjaC0xMDk4NSSLqwo_3rsn-SNVv5IyZjSqeWK61UcpU2OfS_cpsMk',
          password:
            'GouNFe_h5N4uZ5yZueOTZCpt3R6mGk-3stX95JD1AVxQu8jwtd8b8aAPf5ph4tT40kfonQ==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
