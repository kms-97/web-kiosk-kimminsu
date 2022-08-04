import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Food } from './food.entity';

@Entity('SIZE_OPTION_TB')
export class SizeOption {
  @PrimaryColumn({ name: 'food_id' })
  foodId: number;

  @OneToOne(() => Food)
  @JoinColumn({ name: 'food_id', referencedColumnName: 'id' })
  food: Food;

  @Column('decimal', { precision: 10, scale: 0 })
  small: number;

  @Column('decimal', { precision: 10, scale: 0 })
  medium: number;

  @Column('decimal', { precision: 10, scale: 0 })
  large: number;
}
