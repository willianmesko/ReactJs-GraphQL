import { Product } from '../interfaces/Product.interface';
import axios from './api';
import {filterData} from '../utils/filter';
import {sortData} from '../utils/sort';
import {paginationHelper} from '../utils/pagination';
interface GetProductsResponse {
  products: Product[];
  filters: any;
  totalCount: number;
}
export const productsApi = {
  getProducts: async (
    department: string,
    page: number = 1,
    queryFilter?: string,
    sortBy?: string,
  ): Promise<GetProductsResponse> => {
    try {
      const { data } = await axios.get(`${department}`);
      let products = data.data

      const totalCount = products.length;
      if(queryFilter) {
        page = 1;
        products = filterData(products, queryFilter);
      }

      if(sortBy) {
        products = sortData(products, sortBy);
      }

      products = paginationHelper(products, page, 3)

      return {
        products,
        filters: data.filters,
        totalCount,
      };
    } catch (error) {
      throw new Error('Fail to get products');
    }
  },
};
