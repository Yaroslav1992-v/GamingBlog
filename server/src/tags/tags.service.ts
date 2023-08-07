import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TagModel } from './tag.dto/tag.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(TagModel) private readonly tagsModel: ModelType<TagModel>,
  ) {}
  async createTags(tags: string[]) {
    const newTags = await Promise.all(
      tags.map((t) => this.tagsModel.create({ tagName: t, postsNumber: 1 })),
    );
    return newTags;
  }

  async findTagsByName(tagName: string) {
    let regexString = '^';
    for (let i = 0; i < tagName.length; i++) {
      regexString += `${tagName[i]}`;
      if (i < tagName.length - 1) {
        regexString += '.*';
      }
    }
    const regex = new RegExp(`${regexString}`, 'i');
    const tags = await this.tagsModel
      .find({ tagName: { $regex: regex } })
      .limit(10);

    if (!tags) {
      throw new NotFoundException(`tag name  ${tagName} are not founds`);
    }
    return tags;
  }
  async findTagsById(tagsId: string[]) {
    const tags = await this.tagsModel.find({ _id: { $in: tagsId } });

    if (tags.length === 0) {
      throw new NotFoundException(`Tags with the given IDs not found`);
    }

    return tags;
  }
  async increacePostsNumberForTags(tagIds: string[]): Promise<void> {
    console.log(tagIds);
    for (const tagId of tagIds) {
      const tag = await this.tagsModel.findById(tagId);
      if (tag) {
        tag.postsNumber += 1;
        await tag.save();
      }
    }
  }
  async decreasePostsNumberForTags(tagIds: string[]): Promise<void> {
    for (const tagId of tagIds) {
      const tag = await this.tagsModel.findById(tagId);
      if (tag) {
        tag.postsNumber -= 1;
        await tag.save();
      }
    }
  }
}
