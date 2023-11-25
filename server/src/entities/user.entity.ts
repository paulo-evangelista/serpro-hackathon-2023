import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
} from 'typeorm';

import { Investiment } from './investment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    // CPF ou CNPJ
    @Column()
    document: string;

    @Column()
    wallet: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ default: false })
    is_admin: boolean;

    @ManyToMany(() => Investiment, (investiment) => investiment.id)
    investments: Investiment[];
}
