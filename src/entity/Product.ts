import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    abount: string;

    @Column()
    mark: string;

    @Column({type: "numeric"})
    amount: number;

}