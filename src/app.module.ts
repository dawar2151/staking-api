import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LocksModule } from './locks/lock.module'
import { UnlocksModule } from './unlocks/unlock.module';
import { WithdrawsModule } from './withdraws/withdraw.module';
import { UsersModule } from './users/user.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    HttpModule,
    LocksModule,
    UnlocksModule,
    WithdrawsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
