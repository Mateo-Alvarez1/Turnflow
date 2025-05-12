import { Turn } from "src/turn/entities/turn.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name?: string;

  @Column("text", {
    nullable: false,
    unique: true,
  })
  address: string;

  @OneToMany(() => Turn, (turn) => turn.location)
  turns: Turn[];
}
