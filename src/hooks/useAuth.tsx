import React, { createContext, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../interfaces/User.interface';
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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const user = localStorage.getItem('@user');
    if (user) {
      return JSON.parse(user);
    }
    return;
  });
  const history = useHistory();
  const [login] = useMutation(SIGN_IN, {
    onError() {
      toast.error('Email/password invalid');
      return;
    },
    onCompleted(userData) {
      setUser(userData.login.user);
      localStorage.setItem('@token', userData.login.token);
      localStorage.setItem('@user', JSON.stringify(userData.login.user));

      history.push('/');
    },
  });

  async function signIn({ email, password }: SignInCredencials) {
    login({
      variables: {
        data: {
          email,
          password,
        },
      },
    });
  }

  function signOut() {
    localStorage.clear();

    window.location.pathname = '/';
    setUser({} as User);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
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
