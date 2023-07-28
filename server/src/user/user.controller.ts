import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('getById/:id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
}
