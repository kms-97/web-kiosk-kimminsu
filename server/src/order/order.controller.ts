import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { OrderDto } from 'src/dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async insertOrder(@Body() orderDto: OrderDto) {
    const orderNum = await this.orderService.insertOrder(orderDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        orderNum,
      },
    };
  }
}
