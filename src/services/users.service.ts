import { User } from '../interfaces/User.interface';
import axios from './api';
import { toast } from 'react-toastify';

interface ResponseLogin {
  user: User;
}

export const usersApi = {
  signIn: async (email: string, password: string): Promise<ResponseLogin> => {
    try {
      const { data } = await axios.post<ResponseLogin>('session', {
        email,
        password,
      });
      const { user } = data;

      return {
        user
      };
    } catch (error) {
      toast.error('Email/password is invalid');
      throw new Error();
    }
  },
  signUp: async (name: string, email: string, password: string) => {
    try {
      const { data } = await axios.post('user', {
        name,
        email,
        password,
      });
      const { user } = data;

      return {
        user
      };
    } catch (error) {

      toast.error('Account Already exists');
      throw new Error();
    }
  }
};
