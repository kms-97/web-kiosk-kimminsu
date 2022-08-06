import { Category } from 'src/entity/category.entity';

export class CategoryDto {
  constructor(private readonly name: string, private readonly id: number) {}

  static fromCategoryEntity(category: Category) {
    return new CategoryDto(category.name, category.id);
  }
}
