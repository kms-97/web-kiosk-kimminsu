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

  @Column('boolean', { default: false })
  cancel: boolean;

  @Column('datetime', { name: 'create_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.orderHistoryId)
  orderItems: OrderItem[];
}
