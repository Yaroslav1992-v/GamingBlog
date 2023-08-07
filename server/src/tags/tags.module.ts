import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TagModel } from './tag.dto/tag.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TagModel,
        schemaOptions: {
          collection: 'Tag',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
