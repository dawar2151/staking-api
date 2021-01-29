import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lock } from './lock.entity';
import { LocksService } from './locks.service';
import { LocksController } from './locks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lock])],
  providers: [LocksService],
  controllers: [LocksController],
  exports:[ LocksService ]
})

export class LocksModule {}