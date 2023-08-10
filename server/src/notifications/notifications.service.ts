import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { NotificationModel } from './notification.model/notification.model';
import { NotificationDto } from './dto/notfication.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationModel)
    private notificationModel: ModelType<NotificationModel>,
  ) {}

  async create(notif: NotificationDto): Promise<NotificationModel> {
    const notification = (await this.notificationModel.create(notif)).populate(
      'author',
      'username image',
    );
    return notification;
  }
  async removeNotifications(notsIds: string[]): Promise<number> {
    const deletedNot = await this.notificationModel.deleteMany({
      _id: { $in: notsIds },
    });
    return deletedNot.deletedCount;
  }
  async findAll(userId: string): Promise<NotificationModel[]> {
    const not = await this.notificationModel
      .find({ reciever: userId })
      .sort({ createdAt: 'desc' })
      .populate('author', 'username  image')
      .populate('postId', 'mainTitle')
      .exec();

    return not;
  }
  async update(notIds: string[]) {
    const updatedNots = await this.notificationModel.updateMany(
      { _id: { $in: notIds } },
      { $set: { isRead: true } },
      { new: true },
    );
    return updatedNots;
  }

  async delete(id: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(id).exec();
  }
}
