import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Food } from './food.entity';

@Entity('CATEGORY_TB')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 10 })
  name: string;

  @Column('datetime', { name: 'create_at', default: () => 'current_timestamp' })
  createdAt: string;

  @Column('datetime', { name: 'updated_at', default: () => 'current_timestamp' })
  updatedAt: string;

  @OneToMany(() => Food, (food) => food.categoryId)
  foods: Food[];
}
