import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEditDto } from './user.model/dto/user.dto';
import { AuthUser } from 'src/Constants/constants';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('getById/:id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  @Get('getAdmins')
  async findAdmins() {
    return this.userService.findAdminUsers();
  }
  @Patch('edit')
  @UseGuards(AuthGuard)
  async editUser(@Body() data: UserEditDto, @Req() req: AuthUser) {
    try {
      if (req.user.id !== data._id) {
        throw new NotFoundException('Unathorized');
      }
      return this.userService.editUser(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
