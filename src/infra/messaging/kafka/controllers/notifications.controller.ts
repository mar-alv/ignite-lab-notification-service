import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotification } from '@application/use-cases/send-notification';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private readonly _sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() payload: SendNotificationPayload) {
    const { content, category, recipientId } = payload;

    await this._sendNotification.execute({
      content,
      category,
      recipientId,
    });
  }
}
