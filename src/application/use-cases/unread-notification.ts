import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from './erors/notification-not-found-error';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly _notificationnsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this._notificationnsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this._notificationnsRepository.save(notification);
  }
}
