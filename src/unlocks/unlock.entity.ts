import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Unlock {
    
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    holder: string

    @Column()
    amountUnlocked: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}