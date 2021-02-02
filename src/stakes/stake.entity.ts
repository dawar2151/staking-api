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

    @Column({type: 'bigint', default:'0'})
    layerx: string

    @Column({type: 'bigint', default:'0'})
    eth: string

    @Column({default:0})
    timeClosed:number
}
