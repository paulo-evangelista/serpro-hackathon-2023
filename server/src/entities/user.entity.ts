import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';

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

    @Column({ nullable: true })
    wallet: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({default: 0})
    drexBalance: number;

    @Column({ nullable: true, default: '' })
    private_key: string;

    @OneToMany(() => Investment, (investiment) => investiment.owner)
    investments: Investment[];

    @ManyToMany(() => Company, (company) => company.approved_users)
    approved_by: Company[];
}
