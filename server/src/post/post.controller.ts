import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt.guard';

import { PostDto, postEditDto } from './dto/post.dto';
import { PostsService } from './post.service';
import { AuthUser } from 'src/Constants/constants';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createPost(@Body() dto: PostDto) {
    return this.postsService.createPost(dto);
  }
  @Get('loadPosts')
  async loadPosts() {
    try {
      return this.postsService.loadPosts();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch('edit')
  @UseGuards(AuthGuard)
  async editPost(@Body() data: postEditDto, @Req() req: AuthUser) {
    try {
      //   if (req.user.id !== data._id) {
      //     throw new NotFoundException('Unathorized');
      //   }
      return this.postsService.editPost(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get(':postId')
  async loadPost(@Param('postId') postId: string) {
    try {
      return await this.postsService.findPostByPostId(postId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
