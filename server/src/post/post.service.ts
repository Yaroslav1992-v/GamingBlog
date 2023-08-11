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
      .populate({ path: 'tags', select: 'tagName', options: { limit: 3 } })
      .sort({ createdAt: 'desc' })
      .limit(6)
      .exec();
    if (!posts) {
      throw new NotFoundException(`Post not found`);
    }
    return posts;
  }
  async loadAllPosts(): Promise<PostModel[]> {
    const posts = await this.postModel
      .find()
      .select('-__v -tags')
      .populate('user', 'username image')
      .populate({ path: 'tags', select: 'tagName', options: { limit: 3 } })
      .sort({ createdAt: 'desc' })
      .exec();
    if (!posts) {
      throw new NotFoundException(`Post not found`);
    }

    const postsWithTextContent = posts.map((post) => {
      const textContent = post.content.find(
        (item) => item.contentName === 'text',
      );
      if (textContent) {
        return {
          ...post.toObject(),
          content: [textContent],
        };
      }
      return post.toObject();
    });
    return postsWithTextContent;
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
  async findPostsByTag(tagId: string): Promise<PostModel[]> {
    const posts = await this.postModel
      .find({ tags: { $in: [tagId] } })
      .populate('user', 'image username')
      .populate({ path: 'tags', select: 'tagName', options: { limit: 3 } })
      .exec();
    if (!posts || posts.length === 0) {
      throw new NotFoundException(`No posts found with tag ID ${tagId}`);
    }

    return posts;
  }
  async findPostsByWord(name: string): Promise<PostModel[]> {
    const regexString = name.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // Ensure name is properly escaped
    const regex = new RegExp(regexString, 'i');
    const users: PostModel[] = await this.postModel
      .find({ mainTitle: regex })
      .populate('user', 'image username')
      .populate({ path: 'tags', select: 'tagName', options: { limit: 3 } })
      .exec();
    if (!users) {
      throw new NotFoundException(`Users with name  ${name} are not founds`);
    }
    return users;
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
