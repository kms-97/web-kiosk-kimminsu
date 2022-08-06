import { Module } from '@nestjs/common';
import { databaseModule } from '../database';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [databaseModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
