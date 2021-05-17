import React, { createContext, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../interfaces/User.interface';
import { Config } from '../interfaces/Config.interface';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../GraphQL/user.mutations';
interface SignInCredencials {
  email: string;
  password: string;
}

interface AppContextData {
  user: User;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
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
  };
  const history = useHistory();
  const [login] = useMutation(SIGN_IN, {
    onError() {
      toast.error('Email/password invalid');
      return;
    },
    onCompleted(userData: any) {
      setData({
        user: userData.login.user,
        configs: defaultsConfigs,
      });
      localStorage.setItem('@growthHackers:token', userData.login.token);
      localStorage.setItem(
        '@growthHackers:user',
        JSON.stringify(userData.login.user),
      );
      localStorage.setItem(
        '@growthHackers:configs',
        JSON.stringify(defaultsConfigs),
      );

      history.push('/');
    },
  });

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
    login({
      variables: {
        data: {
          email,
          password,
        },
      },
    });
  };

  const signOut = () => {
    localStorage.removeItem('@growthHackers:user');
    localStorage.removeItem('@growthHackers:token');
    localStorage.removeItem('@growthHackers:configs');

    window.location.pathname = '/';
    setData({} as AppState);
  };

  const setConfigs = (configs: Config) => {
    localStorage.setItem('@growthHackers:configs', JSON.stringify(configs));
    setData({
      ...data,
      configs,
    });
  };

  return (
    <AppContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        configs: data.configs,
        setConfigs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useAuth(): AppContextData {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
