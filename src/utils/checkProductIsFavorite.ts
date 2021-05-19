import { Product } from "../interfaces/Product.interface";

const checkProductIsFavorite = (favorites: any, item: Product) => {

    return favorites?.find(favorite => item.name === favorite.name);
  };

export default checkProductIsFavorite;