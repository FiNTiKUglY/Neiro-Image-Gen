import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity("images")
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany((type) => User, (user) => user.likedImages, {cascade: true})
  @JoinTable({
    name: 'liked_images',
    joinColumn: { name: 'image_id', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id'},
  })
  likedUsers: User[];
}