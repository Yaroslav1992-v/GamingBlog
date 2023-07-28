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
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
