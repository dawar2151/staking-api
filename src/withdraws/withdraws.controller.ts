import { Body, Controller, Delete, Get, Param, Put, Post, UseInterceptors } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto'
import { Withdraw } from './withdraw.entity';
import { WithdrawsService } from './withdraws.service';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto'

@Controller('withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawservice: WithdrawsService) {}

  @Put()
  async update(@Body() updateWithdrawDto: UpdateWithdrawDto): Promise<Boolean> {
    const res = await this.withdrawservice.update(updateWithdrawDto);
    return res.affected === 1 ? true : false; 
  }

  @Get()
  findAll(): Promise<Withdraw[]> {
    return this.withdrawservice.findAll();
  }  

}