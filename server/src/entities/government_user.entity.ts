import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Government_User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Company, (company) => company.approved_by)
    approved_companies: Company[];
}
