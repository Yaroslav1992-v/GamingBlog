import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PostDto, postEditDto } from './dto/post.dto';
import { PostModel } from './post.model/post.model';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: ModelType<PostModel>,
  ) {}
  async createPost(post: PostDto) {
    const newPost = await this.postModel.create(post);
    return newPost.populate('user', 'username image');
  }
  async loadPosts(): Promise<PostModel[]> {
    const posts = await this.postModel
      .find()
      .select('-__v -content')
      .populate('user', 'username image')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!posts) {
      throw new NotFoundException(`Post not found`);
    }
    return posts;
  }
  async findPostByPostId(postId: string): Promise<PostModel> {
    const post = await this.postModel
      .findById(postId)
      .populate('user', 'image username')
      .exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${{ postId }} not found`);
    }
    return post;
  }
  async editPost(post: postEditDto): Promise<PostModel> {
    const editedPost = await this.postModel.findOneAndUpdate(
      { _id: post._id },
      { $set: post },
      { new: true }, // This ensures that the updated document is returned
    );
    if (!editedPost) {
      throw new NotFoundException(`Unutharized`);
    }
    return editedPost.populate('user', 'name image username');
  }
}
