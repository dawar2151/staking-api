import { IsNotEmpty } from "class-validator";

export class UpdateUnlockDto {

    id: number;

    holder: string

    amountUnlocked: number
  
    created_at: Date;

}
