
import {IsNotEmpty} from 'class-validator';

export class CreateLockDto {

  id: number;


  holder: string

  amountLocked: number

  stakeId: number

  created_at: Date;

  }