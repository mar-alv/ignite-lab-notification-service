import { IsUUID, IsNotEmpty, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @Length(5, 248)
  content: string;

  @IsNotEmpty()
  category: string;

  @IsUUID()
  @IsNotEmpty()
  recipientId: string;
}
