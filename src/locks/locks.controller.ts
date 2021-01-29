import { Body, Controller, Delete, Get, Param, Put, Post, UseInterceptors } from '@nestjs/common';
import { CreateLockDto } from './dto/create-lock.dto'
import { Lock } from './lock.entity';
import { LocksService } from './locks.service';
import { UpdateLockDto } from './dto/update-lock.dto'

@Controller('locks')
export class LocksController {
  constructor(private readonly lockservice: LocksService) {}

  @Put()
  async update(@Body() updateLockDto: UpdateLockDto): Promise<Boolean> {
    const res = await this.lockservice.update(updateLockDto);
    return res.affected === 1 ? true : false; 
  }

  @Get()
  findAll(): Promise<Lock[]> {
    return this.lockservice.findAll();
  }  

}