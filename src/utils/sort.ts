import { Product } from '../interfaces/Product.interface';

export enum SortOptionsEnum {
  LOWERPRICE = "LOWERPRICE",
  HIGHERPRICE = "HIGHERPRICE",
}

export function sortData(data: Product[], sortBy: string) {
  switch (sortBy) {
    case SortOptionsEnum.LOWERPRICE:
      data = data.sort((a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0));
      break;
    case SortOptionsEnum.HIGHERPRICE:
      data = data.sort((a, b) => (a.price > b.price ? -1 : a.price < b.price ? 1 : 0));
      break;
  }

  return data;
}
