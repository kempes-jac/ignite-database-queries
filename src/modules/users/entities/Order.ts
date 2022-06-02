import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinTable, 
  ManyToMany, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import { Game } from "../../games/entities/Game";
import { User } from "./User";


@Entity('orders')
class Order{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Game, (game) => game)
  @JoinTable()
  games: Game[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinTable()
  user: User;

}

export { Order }