import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lock } from './lock.entity';
import { LocksService } from './locks.service';
import { LocksController } from './locks.controller';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lock]), UsersModule],
  providers: [LocksService],
  controllers: [LocksController],
  exports:[ LocksService ]
})

export class LocksModule {}