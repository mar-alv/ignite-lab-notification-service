import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ReadNotification } from '@application/use-cases/read-notification';
import { SendNotification } from '@application/use-cases/send-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { NotificationsController } from './controllers/notifications.controller';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';

@Module({
  imports: [DatabaseModule],
  providers: [
    SendNotification,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
    GetRecipientNotification,
    CountRecipientNotification,
  ],
  controllers: [NotificationsController],
})
export class HttpModule {}
