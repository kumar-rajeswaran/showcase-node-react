import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CommonColumns } from "./common";

@Entity()
export class Users extends CommonColumns {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
