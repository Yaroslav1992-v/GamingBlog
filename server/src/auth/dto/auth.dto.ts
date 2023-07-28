import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  role: 'admin' | 'user';
}
export class LoginDto {
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
