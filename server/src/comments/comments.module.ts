import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ConfigModule } from '@nestjs/config';
import { CommentModel } from './comments.model/comments.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'Comment',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [CommentsService, JwtService],
  controllers: [CommentsController],
})
export class CommentsModule {}
