import { Product } from './Product.interface';

export interface Favorites {
  userId: string;
  data: Product[];
}
