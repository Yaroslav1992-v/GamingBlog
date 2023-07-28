import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/user/user.model/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from 'src/jwt/jwt.service';
import { Types } from 'mongoose';
import { WRONG_DATA } from 'src/Constants/constants';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserModel') private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(user: RegisterDto) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await this.userModel.create({
      ...user,
      password: hashedPassword,
    });
    const tokens = await this.generateTokens({ id: newUser._id });
    return { ...newUser.toJSON(), ...tokens };
  }
  async generateTokens(id: {
    id: Types.ObjectId;
  }): Promise<{ [key: string]: string }> {
    return {
      accessToken: await this.jwtService.signAccessToken(id),
      refreshToken: await this.jwtService.signRefreshToken(id),
    };
  }
  async login({ email, password }: LoginDto): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(WRONG_DATA);
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const tokens = await this.generateTokens({ id: user._id });
      return { ...user.toJSON(), ...tokens };
    } else {
      throw new BadRequestException(WRONG_DATA);
    }
  }
  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
