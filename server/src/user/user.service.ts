import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UserModel } from './user.model/user.model';
import { UserDto } from './user.model/dto/user.dto';

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
}
