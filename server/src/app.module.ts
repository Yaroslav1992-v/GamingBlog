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
  ],

  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
