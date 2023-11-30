import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Investment } from './investment.entity';

// TABELA APENAS PARA TITULOS PRÉ FIXADOS SEM LIQUIDEZ DIÁRIA

@Entity()
export class Asset_Pre_I {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    ipfsImageURI: string;


    @Column()
    total_supply: number;

    @Column()
    available_supply: number;

    @Column()
    price: number;

    // % de juros ao ano
    @Column()
    interest: number;

    @Column()
    deadline: number;

    @Column()
    address: string;

    @OneToMany(() => Investment, (investiment) => investiment.asset)
    investments: Investment[];

    @CreateDateColumn()
    created_at: Date;
}
