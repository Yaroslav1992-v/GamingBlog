import { IsString, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class PostDto {
  @IsString()
  user: string;
  @IsString()
  mainTitle: string;
  @IsString()
  mainImage: string;
  @IsArray()
  content: postData[];
}
export interface postData {
  contentName: 'image' | 'title' | 'text' | 'quote';
  id: string;
  value: string;
}
export interface postEditDto {
  _id: Types.ObjectId;
}
