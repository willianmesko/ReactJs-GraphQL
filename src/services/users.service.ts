import { toast } from 'react-toastify';
import axios from './api';

export const usersApi = {
  signIn: async (email: string, password: string) => {
    try {
      const  response = await axios.post('session', {
        email,
        password,
      });


      return  response
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
        user,
      };
    } catch (error) {
      toast.error('Account Already exists');
      throw new Error();
    }
  },
};
