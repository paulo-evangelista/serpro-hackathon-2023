import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Asset_Pre_I } from './asset-pre-i.entity';
import { User } from './user.entity';
import { Company } from './company.entity';

@Entity()
export class Investment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    amount: number;

    @Column()
    ipfs_uri: string;

    @ManyToOne(() => Asset_Pre_I)
    asset: Asset_Pre_I;

    @ManyToOne(() => User)
    owner: User;

    //corretora que executou a compra
    @ManyToOne(() => Company)
    company: Company;
}
