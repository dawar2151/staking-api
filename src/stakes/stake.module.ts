import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Stake } from './stake.entity';
import { StakesService } from './stakes.service';
import { StakesController } from './stakes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Stake])],
  providers: [StakesService],
  controllers: [StakesController],
  exports:[ StakesService ]
})

export class StakesModule {}