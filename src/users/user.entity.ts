import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User{
    
    @PrimaryGeneratedColumn("uuid")
    id: number;
    
    @Column()
    address:string

    @Column({default:0})
    lockedAmount:number

    @Column({default:0})
    Layerx: number

    @Column({default:0})
    eth: number
}
