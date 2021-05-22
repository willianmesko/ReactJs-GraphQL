import React, { createContext, useState, useContext } from 'react';
import {
  useLazyQuery,
} from '@apollo/client';
import { Product } from '../interfaces/Product.interface';
import { LOAD_PRODUCTS } from '../GraphQL/product.queries';
import extractSearchFieldOptions from '../utils/extractSearchFieldOptions';
import { SearchOptions } from '../interfaces/SearchOptions.interface';

interface ProductsContextData {
  searchProducts(options: SearchOptions): void;
  products: Product[];
  productsTotalCount: number;
  searchFieldOptions: string[];
  handleResponse(product: Product[], totalCount: number): void;
  isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData,
);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsTotalCount, setProductsTotalCount] = useState<number>(0);
  const [searchFieldOptions, setSearchFieldOptions] = useState<string[]>([]);
  

    
  const [executeSearch, {loading}] = useLazyQuery(LOAD_PRODUCTS, {
    onCompleted(response) {
      console.log(response)
      handleResponse(response.products.products, response.products.totalCount);
    },
    onError(error) {
      console.log(error);
    },
  });

  function searchProducts(options: SearchOptions) { 
    executeSearch({
      variables: {
        ...options,
      }
    });
  }

  function handleResponse(products, totalCount) {
    setProducts(products);
    setProductsTotalCount(totalCount);
    const optionsList = extractSearchFieldOptions(products);
    setSearchFieldOptions(optionsList);
  }

  return (
    <ProductsContext.Provider
      value={{
        searchProducts,
        products,
        productsTotalCount,
        searchFieldOptions,
        handleResponse,
        isLoading: loading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

function useProducts(): ProductsContextData {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useFavorite must be used within an FavoriteProvider.');
  }

  return context;
}

export { ProductsProvider, useProducts };
