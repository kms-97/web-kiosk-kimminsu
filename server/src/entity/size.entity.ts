import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Food } from './food.entity';

@Entity('SIZE_OPTION_TB')
export class SizeOption {
  @PrimaryColumn({ name: 'food_id' })
  foodId: number;

  @OneToOne(() => Food)
  @JoinColumn({ name: 'food_id', referencedColumnName: 'id' })
  food: Food;

  @Column('decimal', { precision: 10, scale: 0, nullable: true })
  small: number | null;

  @Column('decimal', { precision: 10, scale: 0, nullable: true })
  medium: number | null;

  @Column('decimal', { precision: 10, scale: 0, nullable: true })
  large: number | null;
}
