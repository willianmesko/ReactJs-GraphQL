import { OperationVariables, QueryLazyOptions, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import React, { createContext, useState, useContext } from 'react';

import { Product } from '../interfaces/Product.interface';
import { useAuth } from './useAuth';

import { LOAD_PRODUCTS } from '../GraphQL/product.queries';
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
      console.log(response)
     setProducts(response.products.products)

     setProductsTotalCount(response.products.totalCount)
           const productList: string[] = [];
   
           response.products.products.map((product: Product[]) =>
             Object.keys(product).filter(prod =>
               prod !== 'id' &&
               prod !== 'imageUrl' &&
               prod !== '__typename' &&
               !productList.includes(prod)
                 ? productList.push(prod)
                 : '',
             ),
           );
   
           setSearchFieldOptions(productList);
    },
    onError(error)  {
      console.log(error)
    }
  });
  
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
        searchProduct: executeSearch,
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
