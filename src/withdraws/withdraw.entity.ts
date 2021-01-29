import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Withdraw {
    
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    holder: string

    @Column()
    layerx: number

    @Column()
    eth: number

    @Column()
    stakeId: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}