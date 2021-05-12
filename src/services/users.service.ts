import { toast } from 'react-toastify';
import { User } from '../interfaces/User.interface';
import axios from './api';
import { v4 as uuidv4 } from 'uuid';

export const usersApi = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.get('userData');

      let user = response.data;

      user = user.find(
        (u: User) => u.email === email && u.password === password,
      );

      if (!user) {
        throw new Error('Email or password is invalid');
      }

      return  user
    } catch (error) {

      toast.error('Email/password is invalid');
      throw new Error();
    }
  },
  signUp: async (name: string, email: string, password: string) => {
    try {
      const response = await axios.get('userData');
      let user = response.data;

      user = user.find((u: User) => u.email === email);

      if (user) {
        throw new Error('Account Already exists');
      }

      user = {
        uuid: uuidv4(),
        name,
        email,
        password,
      };

      await axios.post('userData', user)

      return {
        user
      };
    } catch (error) {
      toast.error('Account Already exists');
      throw new Error();
    }
  },
};
