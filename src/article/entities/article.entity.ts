import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  title: string
}
