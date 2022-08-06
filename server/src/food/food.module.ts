import { Module } from '@nestjs/common';
import { databaseModule } from '../database';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [databaseModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
