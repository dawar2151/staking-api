import { Body, Controller, Delete, Get, Param, Put, Post, UseInterceptors } from '@nestjs/common';
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
  findAll(): Promise<Unlock[]> {
    return this.unlockservice.findAll();
  }  

}