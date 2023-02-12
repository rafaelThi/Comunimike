import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    active: Boolean

    @Column()
    admin: boolean
}
