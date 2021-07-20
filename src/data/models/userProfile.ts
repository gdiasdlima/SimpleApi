import {  Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserModel } from './user';

@Entity('user_profile')
export class UserProfileModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne(() => UserModel)
  @JoinColumn({ name: 'ID_USER' })
  user: UserModel;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'ID_PROFILE' })
  profile: Profile;

}