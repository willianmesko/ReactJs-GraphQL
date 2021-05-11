import { Product } from '../interfaces/Product.interface';

export function filterData(data: Product[], condition: string) {
  const [type, value] = condition.split('?');
  if (type) {
    return data.filter((product) => product.attributes.find(
      (attribute) => attribute.type === type.toLocaleLowerCase() && attribute.value === value,
    ));
  }
  return data;
}