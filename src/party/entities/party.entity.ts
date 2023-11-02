import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Party {
 @PrimaryGeneratedColumn({name : 'party_id'})
 id: number

 @Column()
 title : string

 @Column()
 location : string

 @Column()
 time: string

 @ManyToOne(()=>User, (user)=>user.parties)
 @JoinColumn({name : "user_id"})
 user:User

 @CreateDateColumn()
 createdAt: Date

 @UpdateDateColumn()
 updatedAt: Date

}
