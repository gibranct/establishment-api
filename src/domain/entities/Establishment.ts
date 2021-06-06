import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

class Address {
  @Column({ nullable: false })
  street!: string

  @Column({ nullable: false })
  number!: string

  @Column({ nullable: false })
  neighborhood!: string

  @Column({ nullable: false })
  city!: string

  @Column({ nullable: false })
  state!: string
}

@Entity('establishments')
export class Establishment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  cnpj!: string

  @Column({ nullable: false })
  name!: string

  @Column(() => Address)
  address!: Address
}
