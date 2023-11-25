import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Asset } from './asset.entity';

@Entity()
export class Investiment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    owner: number;

    @ManyToOne(() => Asset, (asset) => asset.id)
    asset: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    amount: number;
}
