import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { OptionModule } from './option/option.module';
import { OrderModule } from './order/order.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    CategoryModule,
    FoodModule,
    OptionModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
