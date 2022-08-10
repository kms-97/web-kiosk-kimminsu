declare interface CATEGORY {
  id: number;
  name: string;
}

declare interface FOOD {
  id: number;
  name: string;
  basePrice: number;
  imgURL: string;
  star: boolean;
  categoryId: number;
}

declare class ORDERFOOD {
  id: number;
  name: string;
  unit: number;
  size: SIZE;
  temperature: TEMPERATURE;
  eachPrice: number;
  imgURL: string;
}

declare interface OPTION {
  size: { [key in string]: SIZE_PRICE };
  temperature: { [key in string]: TEMPERATURE_PRICE };
}

declare const SIZE = 's' | 'm' | 'l';

declare const TEMPERATURE = 'h' | 'c';

declare class SIZE_PRICE {
  [key: string]: number | null;
  small: number | null;
  medium: number | null;
  large: number | null;
}

declare class TEMPERATURE_PRICE {
  [key: string]: number | null;
  hot: number | null;
  cool: number | null;
}

declare interface QUERY {
  key: string;
  value: any;
}

declare interface REQUEST {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: object;
  query?: QUERY[];
}

declare interface RESPONSE<T> {
  statusCode: number;
  data: T;
}

declare interface ACTION<T> {
  type: string;
  newState?: T;
}

declare interface FLEXPROPS {
  flow?: 'row' | 'column';
  wrap?: 'nowrap' | 'wrap';
  overflow?: 'overflowX' | 'overflowY';
  gap?: string;
  alignItems?: 'start' | 'center' | 'spaceBetween' | 'spaceAround' | 'end';
  alignContent?: 'start' | 'center' | 'spaceBetween' | 'spaceAround' | 'end';
  justifyContent?: 'start' | 'center' | 'spaceBetween' | 'spaceAround' | 'end';
}

declare interface SIZING {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}
