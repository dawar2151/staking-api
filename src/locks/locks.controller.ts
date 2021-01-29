import { Body, Controller, Get, Put, Query } from '@nestjs/common';
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
  find(@Query() query:any): Promise<Lock[]> {
    return this.lockservice.find({holder: query.holder});
  }  

}