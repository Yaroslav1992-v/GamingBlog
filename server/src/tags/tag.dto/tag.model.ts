import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagModel extends Base {}
export class TagModel extends TimeStamps {
  @prop({ required: true })
  tagName: string;
  @prop({ required: true })
  postsNumber: number;
}
