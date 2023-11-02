import { Party } from '../../party/entities/party.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name : 'users'})
export class User {
  @PrimaryGeneratedColumn({name : 'user_id'})
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Party, (party) => party.user, { onDelete: 'CASCADE' })
  parties: Party;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
