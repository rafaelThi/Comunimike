import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HistoryPurchase{
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    idUser:string;

    @Column()
    idProduct:string;

    @Column()
    create: Date;
}