import { Favorites, User } from "../interfaces/User.interface";
import axios from "./api";
import { toast } from 'react-toastify'

interface ResponseLogin {
    user: User;
    favorites: Favorites[]
}

export const usersApi = {
    login: async (email: string, password: string): Promise<ResponseLogin> => {
        try {
            const { data } = await axios.post<ResponseLogin>('users', { email, password });
            const { user, favorites } = data;

            return {
                user,
                favorites
            }
        } catch (error) {

            toast.error("Email/password is invalid", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        throw new Error()
    },
};