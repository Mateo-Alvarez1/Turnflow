import { Turn } from "src/turn/entities/turn.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TurnHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: [
      "requested",
      "waiting",
      "called",
      "attended",
      "skipped",
      "cancelled",
    ],
  })
  status: string;

  @Column({ nullable: true })
  changedByUserId: string;

  @OneToMany(() => Turn, (turn) => turn.turnHistory)
  turns: Turn[];
}
