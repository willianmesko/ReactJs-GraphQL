import { Product } from '../interfaces/Product.interface';

export function orderData(data: Product[], orderBy: string) {
  switch (orderBy) {
    case 'lowerPrice':
      data = data.sort(function (a, b) {
        return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
      });
      break;
    case 'higherPrice':
      data = data.sort(function (a, b) {
        return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
      });
      break;
  }

  return data;
}
