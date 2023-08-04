import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostModel } from './post.model/post.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'Post',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [PostsService, JwtService],
  controllers: [PostsController],
})
export class PostsModule {}
