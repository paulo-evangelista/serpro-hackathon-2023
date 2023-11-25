import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Asset {
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
    fistName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ default: false })
    is_admin: boolean;
}
