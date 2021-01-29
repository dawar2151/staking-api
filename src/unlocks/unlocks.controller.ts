import { Body, Controller, Delete, Get, Param, Put, Post, UseInterceptors, Query } from '@nestjs/common';
import { CreateUnlockDto } from './dto/create-unlock.dto'
import { Unlock } from './unlock.entity';
import { UnlocksService } from './unlocks.service';
import { UpdateUnlockDto } from './dto/update-unlock.dto'

@Controller('unlocks')
export class UnlocksController {
  constructor(private readonly unlockservice: UnlocksService) {}

  @Put()
  async update(@Body() updateLockDto: UpdateUnlockDto): Promise<Boolean> {
    const res = await this.unlockservice.update(updateLockDto);
    return res.affected === 1 ? true : false; 
  }

  @Get()
  find(@Query() query:any): Promise<Unlock[]> {
    return this.unlockservice.find({holder: query.holder});
  }  

}