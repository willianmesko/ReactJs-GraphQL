import React, { createContext, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { usersApi } from '../services/users.service';
import { User } from '../interfaces/User.interface';
import { Favorites } from '../interfaces/Favorites.interface';
import { Product } from '../interfaces/Product.interface';
import { Config } from '../interfaces/Config.interface';
import { Filter } from '../interfaces/Filters.interface';
import { favoritesApi } from '../services/favorites.service';
import { toast } from 'react-toastify';

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
  setUserFavorites(product: Product, filters: Filter[]): void;
  getFavorites(
    page: number,
    queryFilter: string,
    sortBy: String,
  ): Promise<number>;
  removeFavorite(product: Product): Promise<void>;
  favorites: Favorites;
  configs: Config;
  setConfigs(configs?: Config): void;
}

interface AppState {
  user: User;
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
  const [favorites, setFavorites] = useState<Favorites>({} as Favorites);
  const [data, setData] = useState<AppState>(() => {
    const user = localStorage.getItem('@growthHackers:user');
    const configs = localStorage.getItem('@growthHackers:configs');
    if (user && configs) {
      return {
        user: JSON.parse(user),
        configs: JSON.parse(configs),
      };
    }

    return {} as AppState;
  });

  const signIn = async ({ email, password }: SignInCredencials) => {
    const user = await usersApi.signIn(email, password);

    localStorage.setItem('@growthHackers:user', JSON.stringify(user));
    localStorage.setItem(
      '@growthHackers:configs',
      JSON.stringify(defaultsConfigs),
    );

    setData({
      user,
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

  const removeFavorite = async (product: Product): Promise<void> => {
    const { user } = data;

    setFavorites({
      ...favorites,
      products: favorites.products.filter(p => p.name !== product.name),
      filters: favorites.products.length === 0 ? [] : favorites.filters,
    });
    await favoritesApi.deleteFavorite(user.uuid, product);
  };

  const getFavorites = async (
    page: number,
    queryFilter: string,
    sortBy: string,
  ): Promise<number> => {
    const { user } = data;
    const response = await favoritesApi.getFavorites(
      user.uuid,
      page,
      queryFilter,
      sortBy,
    );

    setFavorites(response.favorites);

    return response.totalCount;
  };

  const setUserFavorites = async (product: Product, filters: Filter[]) => {
    const { user } = data;

    if (Object.keys(favorites).length !== 0) {
      if (favorites?.products?.find((p: Product) => p.name === product.name)) {
        return;
      }

      setFavorites({
        ...favorites,
        products: [...favorites.products, product],
        filters: filters.filter(
          filter =>
            !favorites.filters.map(favoriteFilter =>
              favoriteFilter.name === filter.name
                ? [...favorites.filters, filter]
                : favorites.filters,
            ),
        ),
      });
    } else {
      setFavorites({
        userUuid: user.uuid,
        products: [product],
        filters,
      });
    }

    toast.success('Favorite added.');
    await favoritesApi.createFavorite({
      userUuid: user.uuid,
      products: [product],
      filters,
    });
  };

  return (
    <AppContext.Provider
      value={{
        user: data.user,
        signIn,
        signUp,
        signOut,
        setUserFavorites,
        getFavorites,
        removeFavorite,
        favorites,
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
