import { FOOD, PAYMENT } from 'src/types';

export class OrderDto {
  constructor(readonly foods: FOOD[], readonly payment: PAYMENT, readonly date: Date) {}
}
