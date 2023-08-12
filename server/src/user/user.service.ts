import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UserModel } from './user.model/user.model';
import { UserDto, UserEditDto } from './user.model/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('UserModel') private userModel: Model<UserModel>) {}
  async findOneById(id: string): Promise<UserDto> {
    const user: UserDto = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${{ id }} not found`);
    }
    return user;
  }
  async findAdminUsers(): Promise<UserModel[]> {
    const adminUsers: UserModel[] = await this.userModel.find({
      role: 'admin',
    });
    return adminUsers;
  }
  async editUser(data: UserEditDto): Promise<UserModel> {
    const existingUser = await this.userModel.findOne({ email: data.email });
    if (existingUser && existingUser._id.toString() !== data._id.toString()) {
      throw new NotFoundException(`Email ${data.email} already exists`);
    }
    const user = await this.userModel
      .findByIdAndUpdate(data._id, data, { new: true })
      .select('-password -updatedAt -__v -createdAt');
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }
}
