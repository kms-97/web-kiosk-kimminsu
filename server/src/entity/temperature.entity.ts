import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Food } from './food.entity';

@Entity('TEMPERATURE_OPTION_TB')
export class TemperatureOption {
  @PrimaryColumn({ name: 'food_id' })
  foodId: number;

  @OneToOne(() => Food)
  @JoinColumn({ name: 'food_id', referencedColumnName: 'id' })
  food: Food;

  @Column('decimal', { precision: 10, scale: 0 })
  hot: number;

  @Column('decimal', { precision: 10, scale: 0 })
  cool: number;
}
