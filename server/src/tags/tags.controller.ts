import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post('createTags')
  async createTags(@Body('data') data: string[]) {
    return await this.tagsService.createTags(data);
  }
  @Post('findTagsByIds')
  async findTagsByIds(@Body('data') data: string[]) {
    return await this.tagsService.findTagsById(data);
  }
  @Get('search/:tagName')
  async findTagsByName(@Param('tagName') tagName: string) {
    return this.tagsService.findTagsByName(tagName);
  }
  @Patch('tagsPlus')
  async increacePostNumberTags(@Body() { tags }: { tags: string[] }) {
    console.log(tags);
    return this.tagsService.increacePostsNumberForTags(tags);
  }
  @Patch('tagsMinus')
  async decreasePostNumberTags(@Body() { tags }: { tags: string[] }) {
    return this.tagsService.decreasePostsNumberForTags(tags);
  }
}
