import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),

    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
