import {
  QueryLazyOptions,
  useLazyQuery,
  useQuery,
  useMutation,
  OperationVariables,
} from '@apollo/client';
import { toast } from 'react-toastify';
import React, { createContext, useState, useContext } from 'react';
import { CREATE_FAVORITE, DELETE_FAVORITE } from '../GraphQL/favorite.mutation';
import { Product } from '../interfaces/Product.interface';
import { LOAD_FAVORITES } from '../GraphQL/favorite.queries';
import extractSearchFieldOptions from '../utils/extractSearchFieldOptions';


interface FavoritesContextData {
  getFavorites():void;
  addFavorite(product: Product): void;
  removeFavorite(product: Product): void;
  searchFavorite(options: QueryLazyOptions<OperationVariables>): void;
  favorites: Product[];
  favoritesTotalCount: number;
  searchFieldOptions: string[];
  isLoading: boolean;
  searchField: string;
  setSearchField(field: string): void;
  searchValue:string;
  setSearchValue(value:string): void;
  searchSort:string;
  setSearchSort(sort: string): void;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [favoritesTotalCount, setFavoritesTotalCount] = useState<number>(0);
  const [searchFieldOptions, setSearchFieldOptions] = useState<string[]>([]);

  const [searchField, setSearchField] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchSort, setSearchSort] = useState<string>('');

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

      setSearchFieldOptions(
        Object.keys(response.createFavorite.product).filter(
          fav =>
            !searchFieldOptions.includes(fav) &&
            fav !== 'imageUrl' && [...searchFieldOptions, fav],
        ),
      );
         
      setFavorites([...favorites, response.createFavorite.product]);
      setFavoritesTotalCount(response.createFavorite.product.length);
    },
    onError(error) {
      toast.error('Fail.');
      throw new Error(JSON.stringify(error))
    },
  });

  const {loading} = useQuery(LOAD_FAVORITES,{
    variables: {
      page: 1,
      take: 3,
    },
    onCompleted(response) {
      handleResponse(
        response.favorites.favorites,
        response.favorites.totalCount,
      );
    }
  })

  const [executeSearch] = useLazyQuery(LOAD_FAVORITES, {
    onCompleted(response) {
     
      handleResponse(
        response.favorites.favorites,
        response.favorites.totalCount,
      );
    },
  });

  function handleResponse(products, totalCount):void {
    setFavorites(products);
    setFavoritesTotalCount(totalCount);
    const optionsList = extractSearchFieldOptions(products);
    setSearchFieldOptions(optionsList);
  }

  function removeFavorite(product: Product):void {
    deleteFavorite({
      variables: {
        productName: product.name,
      },
    });
  };

  function addFavorite (product: Product) :void {
    createFavorite({
      variables: {
        data: { product },
      },
    });
  };

  function searchFavorite(options: QueryLazyOptions<OperationVariables>) {
  
    executeSearch({ ...options });
  }
  
  function getFavorites():void {
    executeSearch({variables: {
      page: 1,
      take: 3
    }})
  }
  


  return (
    <FavoritesContext.Provider
      value={{
        getFavorites,
        addFavorite,
        removeFavorite,
        favorites,
        favoritesTotalCount,
        searchFieldOptions,
        searchFavorite,
        isLoading: loading,
        searchField,
        setSearchField,
        searchValue,
        setSearchValue,
        searchSort,
        setSearchSort,
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
