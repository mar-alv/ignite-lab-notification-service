import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      readAt: notification.readAt,
      category: notification.category,
      createdAt: notification.createdAt,
      content: notification.content.value,
      canceledAt: notification.canceledAt,
      recipientId: notification.recipientId,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        readAt: raw.readAt,
        category: raw.category,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
        recipientId: raw.recipientId,
        content: new Content(raw.content),
      },
      raw.id,
    );
  }
}
