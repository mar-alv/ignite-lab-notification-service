import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from './erors/notification-not-found-error';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(
    private readonly _notificationnsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this._notificationnsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this._notificationnsRepository.save(notification);
  }
}
