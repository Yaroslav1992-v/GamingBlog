import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt.guard';

import { PostDto } from './dto/post.dto';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createPost(@Body() dto: PostDto) {
    console.log(dto);
    return this.postsService.createPost(dto);
  }
}
