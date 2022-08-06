import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async getAllFoods(@Query('category-id') categoryId: number) {
    let foods = [];
    if (categoryId) foods = await this.foodService.getFoodByCategoryId(categoryId);
    else foods = await this.foodService.getAllFoods();

    return {
      statusCode: HttpStatus.OK,
      data: foods,
    };
  }
}
