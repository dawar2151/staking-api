import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Withdraw } from './withdraw.entity';
import { WithdrawsService } from './withdraws.service';
import { WithdrawsController } from './withdraws.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Withdraw])],
  providers: [WithdrawsService],
  controllers: [WithdrawsController],
  exports:[ WithdrawsService ]
})

export class WithdrawsModule {}