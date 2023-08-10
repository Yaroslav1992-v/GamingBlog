import { Module } from '@nestjs/common';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './notifications.service';
import { JwtService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationModel } from './notification.model/notification.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: NotificationModel,
        schemaOptions: {
          collection: 'Notification',
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, JwtService],
})
export class NotificationsModule {}
