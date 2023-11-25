import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Investment } from './investment.entity';
import { Government_User } from './government_user.entity';

// CORRETORAS

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    is_aproved: boolean;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    wallet: string;

    //Só deve existir se a empresa for aprovada
    @Column({ nullable: true })
    cc_address: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Government_User)
    approved_by: Government_User;

    @OneToMany(() => Investment, (investment) => investment.company)
    investments: Investment[];

    @ManyToMany(() => User, (user) => user.approved_by)
    @JoinTable()
    approved_users: User[];
}
