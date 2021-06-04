import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

class Address {
  @Column({ name: 'zip_code' })
  zipCode!: string

  @Column()
  neighborhood!: string

  @Column()
  city!: string

  @Column()
  state!: string

  @Column()
  street!: string
}

@Entity('establishment')
export class Establishment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  cnpj!: string

  @Column()
  name!: string

  @Column(() => Address)
  address!: Address
}
