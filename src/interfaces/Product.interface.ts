import { Attributes } from "./Attributes.interface";


export interface Product {
    id: number;
    name: string;
    price: number;
    reviewCount: number;
    rating: number;
    imageUrl: string;
    attributes: Attributes;
}