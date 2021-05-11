import { Product } from '../interfaces/Product.interface';

export enum OrderEnum {
  LOWERPRICE = "LOWERPRICE",
  HIGHERPRICE = "HIGHERPRICE",
}

export function orderData(data: Product[], orderBy: string) {
  switch (orderBy) {
    case OrderEnum.LOWERPRICE:
      data = data.sort((a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0));
      break;
    case OrderEnum.HIGHERPRICE:
      data = data.sort((a, b) => (a.price > b.price ? -1 : a.price < b.price ? 1 : 0));
      break;
  }

  return data;
}
