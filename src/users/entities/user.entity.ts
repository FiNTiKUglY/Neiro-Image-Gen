import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { Image } from '../../images/entities/image.entity';

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @ManyToMany((type) => Image, (image) => image.likedUsers)
  @JoinTable({
    name: 'liked_images',
    joinColumn: { name: 'user_id', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'image_id', referencedColumnName: 'id'},
  })
  likedImages: Image[];
}
