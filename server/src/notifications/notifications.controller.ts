import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { NotificationService } from './notifications.service';
import { NotificationDto } from './dto/notfication.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('removeNotifications')
  @UseGuards(AuthGuard)
  removeNotification(@Body() data: string[]) {
    try {
      return this.notificationService.removeNotifications(data);
    } catch (error) {
      {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
  }
  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() notification: NotificationDto) {
    try {
      return this.notificationService.create(notification);
    } catch (error) {
      {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
  }

  @Get('getNotifications/:userId')
  @UseGuards(AuthGuard)
  findAll(@Param('userId') userId: string) {
    try {
      return this.notificationService.findAll(userId);
    } catch (error) {
      {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
  }

  @Patch('readNotifications')
  @UseGuards(AuthGuard)
  update(@Body() { nots }: { nots: string[] }) {
    try {
      return this.notificationService.update(nots);
    } catch (error) {
      {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
  }
}
