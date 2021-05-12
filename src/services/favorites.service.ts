import { Product } from '../interfaces/Product.interface';
import axios from './api';
import {filterData} from '../utils/filter';
import {sortData} from '../utils/sort';
import {paginationHelper} from '../utils/pagination';
import { Favorites } from '../interfaces/Favorites.interface';
import { Filter } from '../interfaces/Filters.interface';
;

interface GetFavoritesResponse {
  favorites: Favorites;
  totalCount: number;
}


export const favoritesApi = {
  getFavorites: async (
   userUuid: string,
   page: number,
   queryFilter?: string,
   sortBy?: string,
  ): Promise<GetFavoritesResponse> => {
    try {
      const { data } = await axios.get('favorites');

      let favorites = data;
      let totalCount = 0;
      favorites = favorites.find((favorite : Favorites) => favorite.userUuid  === userUuid);

     if(favorites) {
       totalCount = favorites.products.length;
      if(queryFilter) {
        page = 1;
        favorites.products = filterData(favorites.products, queryFilter);
      }

      if(sortBy) {
        favorites.products = sortData(favorites.products, sortBy);
      }


      favorites.products = paginationHelper(favorites.products, page, 3)


      return {
        favorites,
        totalCount
      };
    }
    favorites = {
      products: [],
      filters: []
    }
      return {
        totalCount,
        favorites
      }




    } catch (error) {
      throw new Error('Fail to get favorites');
    }
  },
  createFavorite: async ( favorites: Favorites): Promise<void> => {
    try {
      const { data } = await axios.get('favorites');
      const {products, filters, userUuid} = favorites;


     const userFavoriteIndex = data.findIndex((f : Favorites) => f.userUuid === userUuid);

      if(userFavoriteIndex === -1) {
       await axios.post('favorites',
      {
        userUuid,
        products,
        filters
      })
        return;

      }

      data[userFavoriteIndex].products.push(products[0]);
      filters.map(
        (filter: Filter) =>
          ! data[userFavoriteIndex].filters.find(
            (favoriteFilter: Filter) => favoriteFilter.name === filter.name,
          ) &&  data[userFavoriteIndex].filters.push(filter),
      );

      await axios.put(`favorites/${userFavoriteIndex}`, data[userFavoriteIndex] )


    } catch (error) {
      throw new Error('Fail to add favorite')
    }
  },
  deleteFavorite: async(userUuid: string, product: Product): Promise<void> => {

    const { data } = await axios.get('favorites');


   const userFavoriteIndex = data.findIndex((f : Favorites) => f.userUuid === userUuid);

   data[userFavoriteIndex].products=  data[userFavoriteIndex].products.filter((p: Product) => p.name !== product.name);
   data[userFavoriteIndex].filters = data[userFavoriteIndex].products.length === 0 ? [] : data[userFavoriteIndex].filters;



  await axios.put(`favorites/${userFavoriteIndex}`, data[userFavoriteIndex] )

  }
};
