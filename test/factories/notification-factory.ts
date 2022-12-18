import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@application/entities/content';

type Override = Partial<NotificationProps>;

export const makeNotification = (override: Override = {}) => {
  return new Notification({
    category: 'social',
    recipientId: 'recipient-1',
    content: new Content('Nova solicitação de amizade'),
    ...override,
  });
};
