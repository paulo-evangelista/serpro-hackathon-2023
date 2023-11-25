import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm';

import { Investment } from './investment.entity';
import { Company } from './company.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    wallet: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Investment, (investiment) => investiment.owner)
    investments: Investment[];

    @ManyToMany(() => Company, (company) => company.approved_users)
    approved_by: Company[];
}
