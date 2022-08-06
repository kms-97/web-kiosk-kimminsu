import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { OptionModule } from './option/option.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CategoryModule, FoodModule, OptionModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
