
import {IsNotEmpty} from 'class-validator';

export class CreateUnlockDto {

  id: number;


  holder: string

  amountUnlocked: number

  created_at: Date;

  }