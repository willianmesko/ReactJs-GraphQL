import { Product } from '../interfaces/Product.interface';
import axios from './api';

interface GetProductsResponse {
  products: Product[];
  filters: any;
  totalCount: number;
}
export const productsApi = {
  getProducts: async (
    department: string,
    page: number,
    queryFilter?: string,
    orderBy?: string,
  ): Promise<GetProductsResponse> => {
    try {
      const { data, headers } = await axios.get(`products/${department}`, {
        params: {
          page,
          queryFilter,
          orderBy,
        },
      });

      const totalCount = Number(headers['x-total-count']);

      return {
        products: data.products,
        filters: data.filters,
        totalCount,
      };
    } catch (error) {
      throw new Error('Fail to get products');
    }
  },
};
