import { Filter } from './Filters.interface';
import { Product } from './Product.interface';

export interface Favorites {
    userUuid: string;
    products: Product[];
    filters: Filter[];
}
