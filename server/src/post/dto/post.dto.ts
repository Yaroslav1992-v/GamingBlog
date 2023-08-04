import { IsString, IsArray, IsOptional } from 'class-validator';

export class PostDto {
  @IsString()
  userId: string;
  @IsString()
  mainTitle: string;
  @IsArray()
  data: postData[];
}
export interface postData {
  contentName: 'image' | 'title' | 'text' | 'quote';
  id: string;
  value: string;
}
