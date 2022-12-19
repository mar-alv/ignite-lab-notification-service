import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationsController } from './kafka/controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification, KafkaConsumerService],
})
export class MessagingModule {}
