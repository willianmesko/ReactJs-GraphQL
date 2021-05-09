import { Attributes } from "./Attributes.interface";


export interface Favorites {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    attributes: Attributes
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    favorites: Favorites[]
}