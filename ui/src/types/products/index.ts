export interface IProducts {
  id: number;
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProductsResponse {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
}