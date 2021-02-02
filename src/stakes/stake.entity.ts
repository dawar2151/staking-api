import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Stake{
    
    @PrimaryGeneratedColumn("uuid")
    id: number;
    
    @Column()
    start:number

    @Column()
    end:number

    @Column({default:0})
    layerLockedTotal: number

    @Column({default:0})
    layerx: number

    @Column({default:0})
    eth: number
}
