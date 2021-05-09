import { Product } from "../interfaces/Product.interface";
import axios from "./api";
interface GetProductsResponse {
    data: Product[],
    totalCount: number
}
export const productsApi = {

    getProducts: async (category: string, page: number): Promise<GetProductsResponse> => {
        try {
            const { data, headers } = await axios.get(`${category}`, {
                params: {
                    page
                }
            });

            const totalCount = Number(headers['x-total-count']);

            return {
                data,
                totalCount
            }
        } catch (error) {
            throw new Error("Fail to get televisions");
        }
    },
};