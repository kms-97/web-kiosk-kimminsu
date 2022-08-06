export enum SIZE {
  small = 's',
  medium = 'm',
  large = 'l',
}

export enum TEMPERATURE {
  hot = 'h',
  ice = 'c',
}

export enum PAYMENT {
  card = 'card',
  cash = 'cash',
}

export interface OPTION {
  size: SIZE;
  temperature: TEMPERATURE;
}

export interface FOOD {
  id: number;
  name: string;
  unit: number;
  options: OPTION;
  eachPrice: number;
}

export class date {
  year: number;
  month: number;
  date: number;

  toString() {
    return `${this.year}-${this.month}-${this.date}`;
  }
}
