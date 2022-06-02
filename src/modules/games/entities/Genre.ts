import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";


@Entity('genres')
class Genre{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Game, (game) => game.genres)
  @JoinTable()
  games: Game[];

  @CreateDateColumn()
  created_at: Date;

  
}

export { Genre }