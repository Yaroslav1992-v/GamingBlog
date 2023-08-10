import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module';
import { getMongoConfig } from './configs/mongo.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from './jwt/jwt.module';
import { FileModule } from './file/file.module';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { PostsModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    PassportModule,
    JwtModule,
    FileModule,
    PostsModule,
    TagsModule,
    CommentsModule,
    NotificationsModule,
  ],

  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
