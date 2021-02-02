import { Controller, Get, Query } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}

  @Get()
  find(@Query() query:any): Promise<User[]> {
    return this.userservice.find({address: query.holder});
  }  

}