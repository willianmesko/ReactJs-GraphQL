import { QueryLazyOptions, useLazyQuery, useMutation, OperationVariables } from '@apollo/client';
import { toast } from 'react-toastify';
import React, { createContext, useState, useContext } from 'react';
import { CREATE_FAVORITE } from '../GraphQL/favorite.mutation';
import { Product } from '../interfaces/Product.interface';

import { LOAD_FAVORITES } from '../GraphQL/favorite.queries';
interface FavoritesContextData {
  setUserFavorites(product: Product): void;
  removeFavorite(product: Product): Promise<void>;
  favorites: Product[];
  setFavorites(product: Product[]): void;
  setFavoritesTotalCount(total: number): void;
  favoritesTotalCount: number;
  getFavorites(): void;
  searchFieldOptions: string[]
  isLoading: boolean;
  searchFavorite(options: QueryLazyOptions<OperationVariables>): void;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

const FavoritesProvider: React.FC = ({ children }) => {
   const [favorites, setFavorites] = useState<Product[]>([]);
  const [favoritesTotalCount, setFavoritesTotalCount] = useState<number>(0);
  const [searchFieldOptions, setSearchFieldOptions] = useState<string[]>([])

  const [createFavorite] = useMutation(CREATE_FAVORITE, {
    onCompleted(response) {
      toast.success('Favorite saved.');
      console.log(response.createFavorite.data)
      const favoritesList: string[] = [];
      
     
      console.log(searchFieldOptions)
        setSearchFieldOptions(
           Object.keys(response.createFavorite.data).filter(
             fav => !searchFieldOptions.includes(fav) 
             && fav !== 'imageUrl'
            && [...searchFieldOptions, fav] 
            ))
     
   
    
  
      setFavorites([...favorites, response.createFavorite.data] );
      setFavoritesTotalCount(response.createFavorite.data.length);
     
    },
    onError() {
      toast.error('Favorite already include.');
    },
  });

  const [executeSearch, {loading} ] = useLazyQuery(LOAD_FAVORITES, {
    onCompleted(response)  {
     
      setFavoritesTotalCount(response.favorites.totalCount)
      setFavorites(response.favorites.favorites)
      console.log(response.favorites.favorites)
      const favoritesList: string[] = [];
   
      response.favorites.favorites.map((favorite: Product[]) =>
        Object.keys(favorite).filter(fav =>
          fav !== 'id' &&
          fav !== 'imageUrl' &&
          fav !== '__typename' &&
          !favoritesList.includes(fav)
            ? favoritesList.push(fav)
            : '',
        ),
      );

      setSearchFieldOptions(favoritesList);
    }
  });
  const removeFavorite = async (product: Product): Promise<void> => {};

  const setUserFavorites = async (product: Product) => {
    const data = {
      data: product,
    };

    createFavorite({
      variables: {
        data,
      },
    });
  };

  function getFavorites() {
    executeSearch({})
  }
  

  return (
    <FavoritesContext.Provider
      value={{
        setUserFavorites,
        removeFavorite,
        favorites,
        setFavorites,
        setFavoritesTotalCount,
        favoritesTotalCount,
        getFavorites, 
        searchFieldOptions,
        isLoading: loading, 
        searchFavorite: executeSearch,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

function useFavorite(): FavoritesContextData {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorite must be used within an AuthProvider.');
  }

  return context;
}

export { FavoritesProvider, useFavorite };
