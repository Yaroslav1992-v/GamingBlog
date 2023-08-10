import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { UserModel } from '../../user/user.model/user.model';
import { PostModel } from 'src/post/post.model/post.model';
import { CommentModel } from 'src/comments/comments.model/comments.model';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NotificationModel extends Base {}
export class NotificationModel extends TimeStamps {
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  author: Types.ObjectId;
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  reciever: Types.ObjectId;
  @prop({ required: true, type: Types.ObjectId, ref: PostModel })
  postId: { id?: string; url?: string };
  @prop({ required: true, type: Types.ObjectId, ref: CommentModel })
  commentId: { id?: string; url?: string };
  @prop()
  content: string;
  @prop({ default: false })
  isRead?: boolean;
}
