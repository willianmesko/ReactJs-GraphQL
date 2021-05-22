import {
  useLazyQuery,
  useQuery,
  useMutation,
  MutationFunctionOptions,
  OperationVariables,
  QueryLazyOptions
} from '@apollo/client';
import { toast } from 'react-toastify';
import React, { createContext, useState, useContext } from 'react';
import { CREATE_FAVORITE, DELETE_FAVORITE } from '../GraphQL/favorite.mutation';
import { Product } from '../interfaces/Product.interface';
import { LOAD_FAVORITES } from '../GraphQL/favorite.queries';
import extractSearchFieldOptions from '../utils/extractSearchFieldOptions';

interface FavoritesContextData {
  createFavorite(createFavoriteDTO: MutationFunctionOptions<OperationVariables>): void;
  deleteFavorite(deleteFavoriteDTO : MutationFunctionOptions<OperationVariables>): void;
  executeSearch(args: QueryLazyOptions<OperationVariables>): void;
  favorites: Product[];
  favoritesTotalCount: number;
  searchFieldOptions: string[];
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [favoritesTotalCount, setFavoritesTotalCount] = useState<number>(0);
  const [searchFieldOptions, setSearchFieldOptions] = useState<string[]>([]);

  const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
    onCompleted(response) {
      setFavorites(
        favorites.filter(
          favorite => favorite.name !== response.deleteFavorite.product.name,
        ),
      );
    },
  });

  const [createFavorite] = useMutation(CREATE_FAVORITE, {
    onCompleted(response) {
      toast.success('Favorite saved.');
      setSearchFieldOptions(extractSearchFieldOptions(favorites.concat([response.createFavorite.product])));
      setFavorites([...favorites, response.createFavorite.product]);
      setFavoritesTotalCount((favoritesTotalCount) => favoritesTotalCount + 1);
    },
    onError(error) {
      toast.error('Fail.');
      throw new Error(JSON.stringify(error));
    },
  });

  const { loading } = useQuery(LOAD_FAVORITES,{
    onCompleted(response) {
      handleResponse(
        response.favorites.favorites,
        response.favorites.totalCount,
      );
    },
  });

  const [executeSearch] = useLazyQuery(LOAD_FAVORITES, {
    onCompleted(response) {
      handleResponse(
        response.favorites.favorites,
        response.favorites.totalCount,
      );
    },
  });

  function handleResponse(products, totalCount): void {
    setFavorites(products);
    setFavoritesTotalCount(totalCount);
    setSearchFieldOptions(extractSearchFieldOptions(products));
  }

  return (
    <FavoritesContext.Provider
      value={{      
        createFavorite,
        deleteFavorite,
        executeSearch,
        favorites,
        favoritesTotalCount,
        searchFieldOptions,
        isLoading: loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

function useFavorite(): FavoritesContextData {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorite must be used within an FavoriteProvider.');
  }

  return context;
}

export { FavoritesProvider, useFavorite };
