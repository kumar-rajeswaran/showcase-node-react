import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class CommonColumns {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdOn!: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedOn!: Date;
}
