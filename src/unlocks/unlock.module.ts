import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Unlock } from './unlock.entity';
import { UnlocksService } from './unlocks.service';
import { UnlocksController } from './unlocks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Unlock])],
  providers: [UnlocksService],
  controllers: [UnlocksController],
  exports:[ UnlocksService ]
})

export class UnlocksModule {}