import { OperationVariables, QueryLazyOptions, useLazyQuery} from '@apollo/client';
import React, { createContext, useState, useContext } from 'react';
import { Product } from '../interfaces/Product.interface';
import { LOAD_PRODUCTS } from '../GraphQL/product.queries';
import extractSearchFieldOptions from '../utils/extractSearchFieldOptions';

interface ProductsContextData {
  getProducts(departament: string): void
  products: Product[]
  productsTotalCount: number,
  searchFieldOptions: string[]
  isLoading: boolean;
  searchProduct(options: QueryLazyOptions<OperationVariables>): void;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData,
);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsTotalCount, setProductsTotalCount] = useState<number>(0);
  const [searchFieldOptions, setSearchFieldOptions] = useState<string[]>([])
 
  const [executeSearch ,{  loading} ] = useLazyQuery(LOAD_PRODUCTS, {
    onCompleted(response) {
     setProducts(response.products.products)
     setProductsTotalCount(response.products.totalCount)
      const optionsList  = extractSearchFieldOptions(response.products.products);
      setSearchFieldOptions(optionsList);
        
   
    },
    onError(error)  {
      console.log(error)
    }
  });

  async function searchProduct(options:  QueryLazyOptions<OperationVariables>) {
    executeSearch({
      ...options,
    })
  }
  
 async function getProducts(department: string): Promise<void> {
    executeSearch({
      variables: {
        department, 
       }
    })
  }

  

  return (
    <ProductsContext.Provider
      value={{
        isLoading: loading, 
        getProducts,
        products,
        productsTotalCount,
        searchFieldOptions,
        searchProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

function useProducts(): ProductsContextData {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useFavorite must be used within an AuthProvider.');
  }

  return context;
}

export { ProductsProvider, useProducts };
