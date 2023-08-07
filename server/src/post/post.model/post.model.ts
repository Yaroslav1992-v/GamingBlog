import { Ref, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { UserModel } from '../../user/user.model/user.model';
import { postData } from '../dto/post.dto';
import { TagModel } from 'src/tags/tag.dto/tag.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostModel extends Base {}
export class PostModel extends TimeStamps {
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  user: Types.ObjectId;
  @prop({ required: true })
  mainTitle: string;
  @prop({ required: true })
  mainImage: string;
  @prop({
    required: true,
    type: () => [Object],
    validate: (data: postData[]) =>
      data.every(
        (d) =>
          typeof d.contentName === 'string' &&
          typeof d.value === 'string' &&
          typeof d.id === 'number',
      ),
  })
  content: postData[];
  @prop({ type: () => [Types.ObjectId], ref: TagModel })
  tags: Types.ObjectId[];
}
