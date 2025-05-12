import { Turn } from "src/turn/entities/turn.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", {
    nullable: false,
    unique: true,
  })
  email: string;

  @Column("text", {
    nullable: false,
  })
  password: string;

  @Column("text", {
    nullable: false,
    select: false,
  })
  fullname: string;

  @Column("bool", {
    default: true,
  })
  isActive?: boolean;

  @Column("text", {
    array: true,
    nullable: false,
    default: ["client"],
  })
  roles?: string[];

  @OneToMany(() => Turn, (turn) => turn.user)
  turns: Turn[];
}
