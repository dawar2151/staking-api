import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Lock {
    
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    holder: string

    @Column()
    amountLocked: number

    @Column({default:0})
    stakeNum: number

    @Column({default:0})
    timeLocked: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}