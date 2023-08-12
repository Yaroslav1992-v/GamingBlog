import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthUser } from 'src/constants/constants';
import { CommentsService } from './comments.service';
import { CommentDto, EditCommentDto } from './dto/comment.dto';
import { Types } from 'mongoose';
import { CommentModel } from './comments.model/comments.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createComment(@Body() dto: CommentDto) {
    return this.commentsService.createComment(dto);
  }
  @Delete('removeComment/:commentId')
  @UseGuards(AuthGuard)
  async removeComment(
    @Param('commentId') commentId: Types.ObjectId,
    @Req() req: AuthUser,
  ) {
    try {
      await this.commentsService.removeComment(commentId, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch('editComment')
  @UseGuards(AuthGuard)
  async editComment(
    @Body() { data }: EditCommentDto,
    @Req() req: AuthUser,
  ): Promise<CommentModel> {
    try {
      return await this.commentsService.editComment(
        data.commentId,
        data.content,
        req.user.id,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('getComments/:postId')
  @UseGuards(AuthGuard)
  async getByUserId(@Param('postId') postId: string) {
    try {
      return await this.commentsService.getComments(postId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
