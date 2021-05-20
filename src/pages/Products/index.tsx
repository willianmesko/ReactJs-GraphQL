import { useParams } from 'react-router-dom';
import { useQueryParam, NumberParam } from 'use-query-params';
import { Flex, SimpleGrid, Text, Skeleton } from '@chakra-ui/react';
import SearchFilters from '../../components/SearchFilters';
import ProductItem from '../../components/ProductItem';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import { Product } from '../../interfaces/Product.interface';
import { useProducts } from '../../hooks/useProducts';
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
    searchField,
    setSearchField,
    searchValue,
    setSearchValue,
    searchSort,
    setSearchSort,
  } = useProducts();

  const [page] = useQueryParam('page', NumberParam);
  const { loading } = useQuery(LOAD_PRODUCTS, {
    variables: {
      department,
      page
    },
    onCompleted(response) {
      handleResponse(response.products.products, response.products.totalCount);
    },
  });

  return (
    <>
      <Header />
      {loading ? (
        <Flex w="100vw" mt="10" align="center" justify="center">
          {Array(3).map((_, index) => (
            <Skeleton
              key={index}
              w="300px"
              ml="20"
              h="400px"
              borderWidth="1px"
              borderRadius="lg"
            />
          ))}
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
                  <ProductItem key={product.id} product={product} />
                ))
              ) : (
                <Flex w="100vw" justifyContent="center">
                  <Text fontSize="3xl">Product not Found</Text>
                </Flex>
              )}
            </SimpleGrid>
            <Pagination
              totalCountOfRegister={productsTotalCount}
              handlePage={searchProducts}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}
