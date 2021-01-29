import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Lock {
    
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    holder: string

    @Column()
    amountLocked: number

    @Column()
    stakeId: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}