import {
  IsString,
  IsArray,
  IsOptional,
  MinLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Types } from 'mongoose';
export class UserDto {
  _id: Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsOptional()
  image?: string;
  @IsOptional()
  role?: 'admin' | 'user';
  @IsOptional()
  info?: string;
}
export class UserEditDto {
  _id: Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsOptional()
  image?: string;
  @IsOptional()
  info?: string;
}
