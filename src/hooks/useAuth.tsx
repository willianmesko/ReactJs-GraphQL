import React, { createContext, useCallback, useState, useContext } from 'react';
import { usersApi } from '../services/users.service';
import { Favorites, User } from '../interfaces/User.interface';
import { Product } from '../interfaces/Product.interface';
import { Config } from '../interfaces/Config.interface';




interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  addFavorites(product: Product): Promise<void>;
  favorites: Favorites[];
  configs: Config;
  setConfigs(configs?: Config): void
}

interface AuthState {
  user: User;
  favorites: Favorites[]
  configs: Config

}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const defaultsConfigs = {
    productCurrentPage: 1,
    favoritesCurrentPage: 1,
  }
  const [data, setData] = useState<AuthState>(() => {

    const user = localStorage.getItem('@growthHackers:user');
    const favorites = localStorage.getItem('@growthHackers:favorites')
    const configs = localStorage.getItem("@growthHackers:configs")
    if (user && favorites && configs) {

      return { user: JSON.parse(user), favorites: JSON.parse(favorites), configs: JSON.parse(configs) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {

    const { user, favorites } = await usersApi.login(email, password);

    localStorage.setItem('@growthHackers:user', JSON.stringify(user));
    localStorage.setItem('@growthHackers:favorites', JSON.stringify(favorites));
    localStorage.setItem('@growthHackers:configs', JSON.stringify(defaultsConfigs));

    setData({ user, favorites, configs: defaultsConfigs });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@growthHackers:user");
    localStorage.removeItem("@growthHackers:favorites");
    localStorage.removeItem("@growthHackers:config");
    setData({} as AuthState);
  }, []);

  const setConfigs = useCallback((configs) => {

    localStorage.setItem('@growthHackers:configs', JSON.stringify(configs));
    setData({
      user: data.user, favorites: data.favorites, configs
    });
  }, []);

  const addFavorites = useCallback(async (product: Product) => {
    const { favorites } = data;

    const findFavorite = favorites.find(favorite => favorite.id === product.id);
    if (findFavorite) {
      throw new Error("Favorite already include")
    }

    favorites.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      attributes: product.attributes
    });
    setData({ user: data.user, configs: data.configs, favorites })
    localStorage.setItem('@growthHackers:favorites', JSON.stringify(favorites));
  }, [data.favorites]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        addFavorites,
        favorites: data.favorites,
        configs: data.configs,
        setConfigs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
