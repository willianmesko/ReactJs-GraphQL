import React, { createContext, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usersApi } from '../services/users.service';
import { User } from '../interfaces/User.interface';
import { Favorites } from '../interfaces/Favorites.interface';
import { Product } from '../interfaces/Product.interface';
import { Config } from '../interfaces/Config.interface';
import { Filter } from '../interfaces/Filters.interface';

interface SignInCredencials {
  email: string;
  password: string;
}

interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

interface AppContextData {
  user: User;
  signIn(credencials: SignInCredencials): Promise<void>;
  signUp(signUpDto: SignUpDTO): Promise<void>;
  signOut(): void;
  setFavorites(product: Product, filters: Filter[]): void;
  removeFavorite(product: Product): Product[];
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
    productsOrder: 'lowerPrice',
    favoritesOrder: 'lowerPrice',
    productsQueryFilter: '',
    favoritesQueryFilter: '',
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

  const signIn = async ({ email, password }: SignInCredencials) => {
    const response = await usersApi.signIn(email, password);
    const user = response.data;

    localStorage.setItem('@growthHackers:user', JSON.stringify(user));
    localStorage.setItem(
      '@growthHackers:configs',
      JSON.stringify(defaultsConfigs),
    );

    setData({
      user,
      favorites: {
        userUuid: user.uuid,
        products: [],
        filters: [],
      },
      configs: defaultsConfigs,
    });
  };

  const signUp = async ({
    name,
    email,
    password,
  }: SignUpDTO): Promise<void> => {
    try {
      await usersApi.signUp(name, email, password);
      history.push('/signIn');
    } catch (error) {}
  };

  const signOut = () => {
    localStorage.removeItem('@growthHackers:user');
    localStorage.removeItem('@growthHackers:favorites');
    localStorage.removeItem('@growthHackers:configs');
    history.push('/');
    setData({} as AppState);
  };

  const setConfigs = (configs: Config) => {
    localStorage.setItem('@growthHackers:configs', JSON.stringify(configs));
    setData({
      ...data,
      configs,
    });
  };

  const removeFavorite = (product: Product): Product[] => {
    const { favorites } = data;

    const updatedFavorites = favorites;

    updatedFavorites.products = updatedFavorites.products.filter(
      favoriteProduct => favoriteProduct.id !== product.id,
    );

    updatedFavorites.filters =
      updatedFavorites.products.length === 0 ? [] : updatedFavorites.filters;
    setData({
      ...data,
      favorites: updatedFavorites,
    });
    localStorage.setItem(
      '@growthHackers:favorites',
      JSON.stringify(updatedFavorites),
    );

    return updatedFavorites.products;
  };

  const setFavorites = async (product: Product, filters: Filter[]) => {
    const { favorites } = data;

    const findFavorite = favorites.products.find(
      favoriteProduct => favoriteProduct.name === product.name,
    );

    if (findFavorite) {
      toast.error('Favorite already include');

      return;
    }

    const updatedFavorites = favorites;

    updatedFavorites.products.push(product);

    filters.map(
      (filter: Filter) =>
        !updatedFavorites.filters.find(
          favoriteFilter => favoriteFilter.name === filter.name,
        ) && updatedFavorites.filters.push(filter),
    );

    localStorage.setItem(
      '@growthHackers:favorites',
      JSON.stringify(updatedFavorites),
    );

    setData({
      ...data,
      favorites: updatedFavorites,
    });

    toast.success('Favorite added');
  };

  return (
    <AppContext.Provider
      value={{
        user: data.user,
        signIn,
        signUp,
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
