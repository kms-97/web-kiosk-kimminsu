enum SIZE {
  small = 's',
  medium = 'm',
  large = 'l',
}

enum TEMPERATURE {
  hot = 'h',
  ice = 'c',
}

enum PAYMENT {
  card = 'card',
  cash = 'cash',
}

interface option {
  size: SIZE;
  temperature: TEMPERATURE;
}

interface food {
  id: number;
  name: string;
  unit: number;
  options: option;
  eachPrice: number;
}

export class OrderDto {
  constructor(readonly foods: food[], readonly payment: PAYMENT, readonly date: Date) {}
}
