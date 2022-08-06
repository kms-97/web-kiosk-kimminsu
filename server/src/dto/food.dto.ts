import { Food } from 'src/entity/food.entity';

export class FoodDto {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly basePrice: number,
    private readonly categoryId: number,
    private readonly imgURL: string,
    private readonly star: boolean = false,
  ) {}

  static fromFoodEntity(food: Food, totalOrderInWeek: number) {
    const menuOrderInWeek = food.orders.reduce((sum, order) => sum + order.unit, 0);
    const isStarMenu = menuOrderInWeek / totalOrderInWeek >= 0.1;
    return new FoodDto(
      food.id,
      food.name,
      food.basePrice,
      food.categoryId,
      food.imgURL,
      isStarMenu,
    );
  }
}
