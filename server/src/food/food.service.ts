import { Inject, Injectable } from '@nestjs/common';
import { FoodDto } from 'src/dto/food.dto';
import { Food } from 'src/entity/food.entity';
import { Between, DataSource } from 'typeorm';
import { dateClassToString, getToday, getWeekAgo } from 'src/util/time';
import { OrderItem } from 'src/entity/orderItem.entity';

@Injectable()
export class FoodService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async getAllFoods(): Promise<FoodDto[]> {
    const today = getToday();
    const startDate = getWeekAgo(today);

    const foodEntities = await this.dataSource
      .createQueryBuilder()
      .select('food')
      .from(Food, 'food')
      .leftJoinAndSelect('food.orders', 'orderItem')
      .getMany();

    const orderItemEntities = await this.dataSource.manager.find(OrderItem, {
      where: {
        createdAt: Between(dateClassToString(startDate), dateClassToString(today)),
      },
    });

    const totalOrderInWeek = orderItemEntities.reduce((total, item) => total + item.unit, 0);
    return foodEntities.map((food) => FoodDto.fromFoodEntity(food, totalOrderInWeek));
  }

  async getFoodByCategoryId(categoryId: number): Promise<FoodDto[]> {
    const today = getToday();
    const startDate = getWeekAgo(today);

    const foodEntities = await this.dataSource
      .createQueryBuilder()
      .select('food')
      .from(Food, 'food')
      .leftJoinAndSelect('food.orders', 'orderItem')
      .where('food.category_id = :id', { id: categoryId })
      .getMany();

    const orderItemEntities = await this.dataSource.manager.find(OrderItem, {
      where: {
        createdAt: Between(dateClassToString(startDate), dateClassToString(today)),
      },
    });

    const totalOrderInWeek = orderItemEntities.reduce((total, item) => total + item.unit, 0);
    return foodEntities.map((food) => FoodDto.fromFoodEntity(food, totalOrderInWeek));
  }
}
