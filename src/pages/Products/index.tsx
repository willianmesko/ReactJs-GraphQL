import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, SimpleGrid, Text, Skeleton } from '@chakra-ui/react';
import ProductItem from '../../components/ProductItem';
import Header from '../../components/Header';
import { Product } from '../../interfaces/Product.interface';
import { useProducts } from '../../hooks/useProducts';
import SearchFilters from '../../components/SearchFilters';
import Paginators from '../../components/Paginator';
import { useQuery } from '@apollo/client';
import { LOAD_PRODUCTS } from '../../GraphQL/product.queries';

interface RouteParams {
  department: string;
}

export default function Products() {
  const { department } = useParams<RouteParams>();
  const {
    searchProducts,
    products,
    productsTotalCount,
    searchFieldOptions,
    handleResponse,
  } = useProducts();

  const { loading } = useQuery(LOAD_PRODUCTS, {
    variables: {
      department,
    },
    onCompleted(response) {
      handleResponse(response.products.products, response.products.totalCount);
    },
  });

  const [searchField, setSearchField] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchSort, setSearchSort] = useState<string>('');
  return (
    <>
      <Header />

      {loading ? (
        <Flex w="100vw" mt="10" align="center" justify="center">
          {Array(3).map(() => {
            <Skeleton
              w="300px"
              ml="20"
              h="400px"
              borderWidth="1px"
              borderRadius="lg"
            />;
          })}
        </Flex>
      ) : (
        <Flex>
          <Flex
            w="100vw"
            mt="10"
            align="center"
            justify="center"
            flexDirection="column"
          >
            <SearchFilters
              searchField={searchField}
              setSearchField={setSearchField}
              searchFieldOptions={searchFieldOptions}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              searchSort={searchSort}
              setSearchSort={setSearchSort}
              executeSearch={searchProducts}
            />

            <SimpleGrid columns={3} spacing={20}>
              {products ? (
                products.map((product: Product, i: number) => (
                  <ProductItem product={product} />
                ))
              ) : (
                <Flex w="100vw" justifyContent="center">
                  <Text fontSize="3xl">Product not Found</Text>
                </Flex>
              )}
            </SimpleGrid>

            <Paginators
              totalCountOfRegister={productsTotalCount}
              handlePage={searchProducts}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}
