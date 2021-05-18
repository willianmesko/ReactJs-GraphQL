import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import React, { createContext, useState, useContext } from 'react';
import { CREATE_FAVORITE } from '../GraphQL/favorite.mutation';
import { Product } from '../interfaces/Product.interface';
import { useAuth } from './useAuth';
import { LOAD_FAVORITES } from '../GraphQL/favorite.queries';
interface FavoritesContextData {
  setUserFavorites(product: Product): void;
  removeFavorite(product: Product): Promise<void>;
  favorites: Product[];
  setFavorites(product: Product[]): void;
  setFavoritesTotalCount(total: number): void;
  favoritesTotalCount: number;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

const FavoritesProvider: React.FC = ({ children }) => {
   const [favorites, setFavorites] = useState<Product[]>([]);
  const [favoritesTotalCount, setFavoritesTotalCount] = useState<number>(0);

  const [createFavorite] = useMutation(CREATE_FAVORITE, {
    onCompleted(response) {
      toast.success('Favorite saved.');

      setFavorites(response.createFavorite.data);
      setFavoritesTotalCount(response.createFavorite.data.length);
    },
    onError() {
      toast.error('Favorite already include.');
    },
  });

  useQuery(LOAD_FAVORITES, {
    onCompleted(response)  {
      setFavoritesTotalCount(response.favorites.totalCount)
      setFavorites(response.favorites.favorites)
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

  return (
    <FavoritesContext.Provider
      value={{
        setUserFavorites,
        removeFavorite,
        favorites,
        setFavorites,
        setFavoritesTotalCount,
        favoritesTotalCount,
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
