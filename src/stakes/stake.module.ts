import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Stake } from './stake.entity';
import { StakesService } from './stakes.service';
import { StakesController } from './stakes.controller';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stake]), UsersModule],
  providers: [StakesService],
  controllers: [StakesController],
  exports:[ StakesService ]
})

export class StakesModule {}