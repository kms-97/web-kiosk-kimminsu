import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from './food.entity';
import { OrderHistory } from './orderHistory.entity';
import { SIZE, TEMPERATURE } from 'src/types';

@Entity('ORDER_ITEM_TB')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderHistory, (history) => history.id)
  @JoinColumn({ name: 'order_history_id' })
  orderHistoryId: number;

  @ManyToOne(() => Food, (food) => food.id)
  @JoinColumn({ name: 'food_id' })
  foodId: number;

  @Column('char', { length: 30, name: 'food_name' })
  foodName: string;

  @Column('int')
  unit: number;

  @Column('decimal', { precision: 10, scale: 0, name: 'each_price' })
  eachPrice: number;

  @Column({ type: 'enum', enum: SIZE })
  size: SIZE;

  @Column({ type: 'enum', enum: TEMPERATURE })
  temperature: TEMPERATURE;

  @Column('datetime', { name: 'created_at', default: () => 'current_timestamp' })
  createdAt: string;
}
