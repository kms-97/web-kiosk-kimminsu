import { Module } from '@nestjs/common';
import { databaseModule } from '../database';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [databaseModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
