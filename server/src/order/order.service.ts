import { Inject, Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dto/order.dto';
import { OrderHistory } from 'src/entity/orderHistory.entity';
import { convertDateStringToClass, dateClassToString } from 'src/util/time';
import { DataSource, InsertResult, QueryRunner } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  private async getOrderNumber(queryRunner: QueryRunner, orderDto: OrderDto) {
    const date = convertDateStringToClass(orderDto.date);
    const dateString = dateClassToString(date);

    const { orderNum } = await queryRunner.manager
      .createQueryBuilder()
      .select('ifnull(MAX(order_num), 0) + 1 as orderNum')
      .from(OrderHistory, 'ORDER_HISTORY_TB')
      .where('create_at between :date and :date', { date: dateString })
      .getRawOne();

    return orderNum;
  }

  private async insertNewOrderHistory(
    queryRunner: QueryRunner,
    orderNum: number,
    orderDto: OrderDto,
  ): Promise<number> {
    const date = convertDateStringToClass(orderDto.date);
    const dateString = dateClassToString(date);

    const { insertId } = await queryRunner.query(
      `insert into ORDER_HISTORY_TB (order_num, total_price, payment, create_at)
  value (?, ?, ?, ?)`,
      [
        orderNum,
        orderDto.foods.reduce(
          (totalPrice, { unit, eachPrice }) => (totalPrice += unit * eachPrice),
          0,
        ),
        orderDto.payment,
        dateString,
      ],
    );

    return insertId;
  }

  private insertOrderItems(
    queryRunner: QueryRunner,
    orderDto: OrderDto,
    insertId: number,
  ): Promise<InsertResult>[] {
    return orderDto.foods.map((food) =>
      queryRunner.query(
        `insert into ORDER_ITEM_TB (food_id, food_name, unit, each_price, size, temperature, order_history_id)
            value (?, ?, ?, ?, ?, ?, ?)`,
        [
          food.id,
          food.name,
          food.unit,
          food.eachPrice,
          food.options.size,
          food.options.temperature,
          insertId,
        ],
      ),
    );
  }

  async insertOrder(orderDto: OrderDto): Promise<number> {
    const randomCount = 1e9 * Math.ceil(Math.random() * 7);
    for (let i = 0; i < randomCount; i++) {
      continue;
    }
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderNum = await this.getOrderNumber(queryRunner, orderDto);
      const insertId = await this.insertNewOrderHistory(queryRunner, orderNum, orderDto);

      const insertItemPromises = this.insertOrderItems(queryRunner, orderDto, insertId);
      await Promise.all(insertItemPromises);

      await queryRunner.commitTransaction();
      return orderNum as number;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
