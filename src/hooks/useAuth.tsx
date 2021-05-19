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

interface AuthContextData {
  user: User;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  configs: Config;
  setConfigs(configs?: Config): void;
}

interface AuthState {
  user: User;
  configs: Config;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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
    onCompleted(userData) {
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

  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@growthHackers:user');
    const configs = localStorage.getItem('@growthHackers:configs');
    if (user && configs) {
      return {
        user: JSON.parse(user),
        configs: JSON.parse(configs),
      };
    }

    return {} as AuthState;
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
    localStorage.clear();
   
    window.location.pathname = '/';
    setData({} as AuthState);
  };

  const setConfigs = (configs: Config) => {
    localStorage.setItem('@growthHackers:configs', JSON.stringify(configs));
    setData({
      ...data,
      configs,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        configs: data.configs,
        setConfigs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useApp must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
