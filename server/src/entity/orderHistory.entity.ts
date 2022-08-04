import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from './orderItem.entity';

enum payment {
  cash = 'cash',
  card = 'card',
}

@Entity('ORDER_HISTORY_TB')
export class OrderHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'order_num' })
  orderNum: number;

  @Column('decimal', { precision: 10, scale: 0, name: 'total_price' })
  totalPrice: number;

  @Column({ type: 'enum', enum: payment })
  payment: string;

  @Column('boolean')
  cancel: boolean;

  @Column('datetime', { name: 'craete_at' })
  createdAt: string;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: string;

  @OneToMany(() => OrderItem, (item) => item.orderHistoryId)
  orderItems: OrderItem[];
}
