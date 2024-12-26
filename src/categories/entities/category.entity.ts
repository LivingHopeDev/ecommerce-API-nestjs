import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updateAt: string;
  @ManyToOne(() => UserEntity, (user) => user.categories)
  addedBy: UserEntity;
  @OneToMany(() => ProductEntity, (prod) => prod.category)
  products: ProductEntity[];
}
