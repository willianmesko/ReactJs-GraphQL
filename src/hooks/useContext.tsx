import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { usersApi } from '../services/users.service';
import { Favorites, User } from '../interfaces/User.interface';
import { Product } from '../interfaces/Product.interface';
import { Config } from '../interfaces/Config.interface';
import { toast } from 'react-toastify';
import { Filter } from '../interfaces/Filters.interface';

interface SignInCredencials {
  email: string;
  password: string;
}

interface AppContextData {
  user: User;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  setFavorites(product: Product, filters: Filter[]): void;
  removeFavorite(id: number): void;
  favorites: Favorites;
  configs: Config;
  setConfigs(configs?: Config): void;
}

interface AppState {
  user: User;
  favorites: Favorites;
  configs: Config;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const AuthProvider: React.FC = ({ children }) => {
  const defaultsConfigs = {
    productCurrentPage: 1,
    favoritesCurrentPage: 1,
  };
  const history = useHistory();
  const [data, setData] = useState<AppState>(() => {
    const user = localStorage.getItem('@growthHackers:user');
    const favorites = localStorage.getItem('@growthHackers:favorites');
    const configs = localStorage.getItem('@growthHackers:configs');
    if (user && favorites && configs) {
      return {
        user: JSON.parse(user),
        favorites: JSON.parse(favorites),
        configs: JSON.parse(configs),
      };
    }

    return {} as AppState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { user, favorites } = await usersApi.login(email, password);

    localStorage.setItem('@growthHackers:user', JSON.stringify(user));
    localStorage.setItem('@growthHackers:favorites', JSON.stringify(favorites));
    localStorage.setItem(
      '@growthHackers:configs',
      JSON.stringify(defaultsConfigs)
    );

    setData({ user, favorites, configs: defaultsConfigs });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@growthHackers:user');
    localStorage.removeItem('@growthHackers:favorites');
    localStorage.removeItem('@growthHackers:configs');
    history.push('/');
    setData({} as AppState);
  }, []);

  const setConfigs = useCallback((configs) => {
    localStorage.setItem('@growthHackers:configs', JSON.stringify(configs));
    setData({
      user: data.user,
      favorites: data.favorites,
      configs,
    });
  }, []);

  const removeFavorite = (id: number) => {
    const { favorites } = data;
    if (favorites.products.length > 0) {
      let updatedFavorites = favorites;
      updatedFavorites.products = updatedFavorites.products.filter(
        (product) => product.id !== id
      );
      setData({
        ...data,
        favorites: updatedFavorites,
      });
      localStorage.setItem(
        '@growthHackers:favorites',
        JSON.stringify(updatedFavorites)
      );
    }
  };

  const setFavorites = (product: Product, filters: Filter[]) => {
    const { favorites } = data;

    const findFavorite = favorites.products?.find(
      (favorite) => favorite.id === product.id
    );

    if (findFavorite) {
      toast.error('Favorite already included');
      return;
    }

    const updatedFavorites = favorites;
    updatedFavorites.products.push(product);

    filters.map(
      (filter) =>
        !updatedFavorites.filters.find(
          (favoriteFilter) => favoriteFilter.name === filter.name
        ) && updatedFavorites.filters.push(filter)
    );
    setData({
      user: data.user,
      configs: data.configs,
      favorites: updatedFavorites,
    });
    localStorage.setItem(
      '@growthHackers:favorites',
      JSON.stringify(updatedFavorites)
    );
    toast.success('Favorite added');
  };

  return (
    <AppContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        setFavorites,
        removeFavorite,
        favorites: data.favorites,
        configs: data.configs,
        setConfigs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useApp(): AppContextData {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useApp };
