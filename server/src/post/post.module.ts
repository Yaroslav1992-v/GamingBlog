import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostModel } from './post.model/post.model';
import { TagModel } from 'src/tags/tag.dto/tag.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'Post',
        },
      },
      {
        typegooseClass: TagModel,
        schemaOptions: {
          collection: 'Tag',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [PostsService, JwtService],
  controllers: [PostsController],
})
export class PostsModule {}
