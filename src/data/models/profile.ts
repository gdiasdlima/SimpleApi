import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('profile')
export class ProfileModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  profile: string

}