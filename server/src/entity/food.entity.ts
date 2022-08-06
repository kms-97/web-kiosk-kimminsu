import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { OrderItem } from './orderItem.entity';

@Entity('FOOD_TB')
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('char', { length: 30 })
  name: string;

  @Column('varchar', { length: 200, name: 'img_url' })
  imgURL: string;

  @Column('decimal', { precision: 10, scale: 0, name: 'base_price' })
  basePrice: number;

  @ManyToOne(() => Category, (category) => category.foods)
  @JoinColumn({ name: 'category_id' })
  categories: Category;

  @OneToMany(() => OrderItem, (item) => item.foodId)
  orders: OrderItem[];
}
