import { Controller, Get, Query } from '@nestjs/common';
import { Stake } from './stake.entity';
import { StakesService } from './stakes.service';

@Controller('stakes')
export class StakesController {
  constructor(private readonly stakeservice: StakesService) {}

  @Get()
  find(@Query() query:any): Promise<Stake[]> {
    return this.stakeservice.findAll();
  }  

}