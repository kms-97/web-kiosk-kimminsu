import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    const categories = await this.categoryService.getAllCategory();

    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }
}
