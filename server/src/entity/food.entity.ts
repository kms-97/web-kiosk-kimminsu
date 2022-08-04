import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('FOOD_TB')
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 30 })
  name: string;

  @Column('varchar', { length: 200, name: 'img_url' })
  imgURL: string;

  @Column('decimal', { precision: 10, scale: 0, name: 'base_price' })
  basePrice: number;

  @ManyToOne(() => Category, (category) => category.foods)
  @JoinColumn({ name: 'category_id' })
  categoryId: Category;
}
