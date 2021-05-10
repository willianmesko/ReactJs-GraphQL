import { Attributes } from './Attributes.interface';
import { Filter } from './Filters.interface';
import { Product } from './Product.interface';

export interface Favorites {
  products: Product[];
  filters: Filter[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  favorites: Favorites[];
}
