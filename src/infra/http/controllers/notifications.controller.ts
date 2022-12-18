import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReadNotification } from '@application/use-cases/read-notification';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly _sendNotification: SendNotification,
    private readonly _readNotification: ReadNotification,
    private readonly _unreadNotification: UnreadNotification,
    private readonly _cancelNotification: CancelNotification,
    private readonly _getRecipientNotification: GetRecipientNotification,
    private readonly _countRecipientNotification: CountRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this._cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this._countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this._getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this._readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this._unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this._sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }
}
