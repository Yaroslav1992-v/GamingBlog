import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator';

export class NotificationDto {
  @IsString()
  author: string;
  @IsString()
  reciever: string;
  @IsOptional()
  @IsString()
  content: string;
  @IsString()
  postId: string;
  @IsString()
  commentId: string;
  @IsBoolean()
  isRead: boolean;
}
