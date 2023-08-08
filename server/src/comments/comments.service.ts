import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types, ObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommentDto } from './dto/comment.dto';
import { CommentModel } from './comments.model/comments.model';
import { PostModel } from 'src/post/post.model/post.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentModel)
    private readonly commentModel: ModelType<CommentModel>,
  ) {}
  async createComment(comment: CommentDto) {
    const newComment = (await this.commentModel.create(comment)).populate(
      'user',
      'username image',
    );
    return newComment;
  }
  async removeComment(
    commentId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<void> {
    const comment = await this.commentModel.findOne({ _id: commentId });
    console.log(comment);
    if (comment.user.toString() !== userId.toString()) {
      throw new NotFoundException(`Unathorized`);
    }
    await this.commentModel.deleteMany({
      'reply.parentId': commentId,
    });
    await comment.deleteOne();
  }
  async removeComments(postId: string): Promise<void> {
    await Promise.all([this.commentModel.deleteMany({ postId })]);
  }
  async editComment(
    commentId: string,
    content: string,
    userId: Types.ObjectId,
  ): Promise<CommentModel> {
    const comment = await this.commentModel.findOne({ _id: commentId });

    if (comment.user.toString() !== userId.toString()) {
      throw new NotFoundException(`Unathorized`);
    }
    comment.content = content;
    comment.save();
    return comment.populate('user', 'username image');
  }
  async getComments(postId: string): Promise<CommentModel[]> {
    const comments = await this.commentModel
      .find({ postId })
      .sort({ createdAt: 'desc' })
      .populate('user', 'username image')
      .exec();
    if (!comments) {
      throw new NotFoundException(`Comment with ID ${{ postId }} not found`);
    }

    return [...comments];
  }
}
