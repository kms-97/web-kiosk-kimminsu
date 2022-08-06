import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Food } from './food.entity';

@Entity('TEMPERATURE_OPTION_TB')
export class TemperatureOption {
  @PrimaryColumn({ name: 'food_id' })
  foodId: number;

  @OneToOne(() => Food)
  @JoinColumn({ name: 'food_id', referencedColumnName: 'id' })
  food: Food;

  @Column('decimal', { precision: 10, scale: 0, nullable: true })
  hot: number | null;

  @Column('decimal', { precision: 10, scale: 0, nullable: true })
  cool: number | null;
}
