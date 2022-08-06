import { Inject, Injectable } from '@nestjs/common';
import { CategoryDto } from 'src/dto/category.dto';
import { Category } from 'src/entity/category.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async getAllCategory(): Promise<CategoryDto[]> {
    const categoryEntities = await this.dataSource.manager.find(Category);
    return categoryEntities.map(CategoryDto.fromCategoryEntity);
  }
}
