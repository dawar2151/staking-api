import { IsNotEmpty } from "class-validator";

export class UpdateLockDto {

    id: number;

    holder: string

    amountLocked: number

    stakeId: number

}
