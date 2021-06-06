import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  email!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false })
  password!: string
}
