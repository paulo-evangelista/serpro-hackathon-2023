import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
} from 'typeorm';

@Entity()
export class Factory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column({ unique: true })
    address: string;
}
