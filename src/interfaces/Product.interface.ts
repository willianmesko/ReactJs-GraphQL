export interface Product {
  id: number;
  name: string;
  price: number;
  reviewCount: number;
  rating: number;
  imageUrl: string;
  inch?: number;
  resolution?: string;
  condition?: string;
  memory?: string;
}
