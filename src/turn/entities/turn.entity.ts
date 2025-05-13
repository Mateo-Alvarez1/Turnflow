import { Location } from "src/location/entities/location.entity";
import { TurnHistory } from "src/turn-history/entities/turn-history.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Turn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ["waiting", "called", "attended", "skipped", "cancelled"],
    default: "waiting",
    nullable: true,
  })
  status: "waiting" | "called" | "attended" | "skipped" | "cancelled";

  @Column({
    type: "enum",
    enum: ["normal", "priority"],
    default: "normal",
    nullable: true,
  })
  priorityLevel: "normal" | "priority";

  @Column({ default: 1, unique: true })
  turnNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.turns, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Location, (location) => location.turns, { cascade: true })
  @JoinColumn()
  location: Location;

  @ManyToOne(() => TurnHistory, (turnHistory) => turnHistory.turns, {
    cascade: true,
  })
  @JoinColumn()
  turnHistory: TurnHistory;
}
