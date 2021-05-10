import { Favorites, User } from '../interfaces/User.interface';
import axios from './api';
import { toast } from 'react-toastify';
import { Product } from '../interfaces/Product.interface';

interface ResponseLogin {
  user: User;
  favorites: Favorites;
}

export const usersApi = {
  login: async (email: string, password: string): Promise<ResponseLogin> => {
    try {
      const { data } = await axios.post<ResponseLogin>('users', {
        email,
        password,
      });
      const { user, favorites } = data;

      return {
        user,
        favorites,
      };
    } catch (error) {
      toast.error('Email/password is invalid');
      throw new Error();
    }
  },
};
