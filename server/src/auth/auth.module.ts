import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module';
import { UserModel } from 'src/user/user.model/user.model';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'Users',
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
