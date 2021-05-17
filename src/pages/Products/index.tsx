import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  SimpleGrid,
  Image,
  Badge,
  Text,
  Skeleton,
  Button,
  Select,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Product } from '../../interfaces/Product.interface';
import { useAuth } from '../../hooks/useAuth';
import { Pagination } from '../../components/Pagination';
import { useLazyQuery } from '@apollo/client';
import { LOAD_GAMES } from '../../GraphQL/game.queries';
import { LOAD_TELEVISIONS } from '../../GraphQL/television.queries';
import { useFavorite } from '../../hooks/useFavorites';

interface RouteParams {
  department: string;
}

export default function Products() {
  const { department } = useParams<RouteParams>();
  const { user, configs } = useAuth();
  const { favorites } = useFavorite();
  const { setUserFavorites } = useFavorite();
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>();
  const [searchFieldOptions, setSearchFieldOptions] = useState<string[]>([]);
  const [searchField, setSearchField] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [searchSort, setSearchSort] = useState<string>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [executeSearch, { loading }] = useLazyQuery(
    department === 'televisions' ? LOAD_TELEVISIONS : LOAD_GAMES,
    {
      onCompleted(response) {
        setProducts(response[department].data);

        setTotalCount(response[department].totalCount);
        const productList: string[] = [];

        response[department].data.map((product: Product[]) =>
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
    },
  );

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const isFavorite = (item: Product) => {
    return true;
    return favorites?.find(favorite => item.name === favorite.name);
  };

  useEffect(() => {
    executeSearch({
      variables: {
        field: setSearchField,
        value: setSearchValue,
        page: configs?.productCurrentPage,
      },
    });
  }, []);
  return (
    <>
      <Header />

      {loading ? (
        <Flex w="100vw" mt="10" align="center" justify="center">
          <Skeleton
            w="300px"
            ml="20"
            h="400px"
            borderWidth="1px"
            borderRadius="lg"
          />
          <Skeleton
            w="300px"
            ml="20"
            h="400px"
            borderWidth="1px"
            borderRadius="lg"
          />
          <Skeleton
            w="300px"
            ml="20"
            h="400px"
            borderWidth="1px"
            borderRadius="lg"
          />
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
            <Flex w="80vw" align="center" justifyContent="space-between">
              <Input
                name="value"
                type="value"
                mb="10px"
                mr="10px"
                h="40px"
                isDisabled={!searchField}
                value={searchValue}
                placeholder="Find a favorite"
                onChange={e => setSearchValue(e.target.value)}
              />
              <Select
                ml="10px"
                w="200px"
                mb="10px"
                placeholder="Field"
                value={searchField}
                onChange={e => setSearchField(e.target.value)}
              >
                {searchFieldOptions &&
                  searchFieldOptions.map(option => (
                    <option value={option}>{option.toUpperCase()}</option>
                  ))}
              </Select>

              <Select
                ml="10px"
                mb="10px"
                w="200px"
                placeholder="Sort"
                value={searchSort}
                onChange={e => setSearchSort(e.target.value)}
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </Select>

              <Button
                ml="10px"
                mb="10px"
                width="100px"
                onClick={() =>
                  executeSearch({
                    variables: {
                      field: searchField,
                      value: searchValue,
                      sort: searchSort,
                    },
                  })
                }
              >
                Search
              </Button>
            </Flex>
            <SimpleGrid columns={3} spacing={20}>
              {products && products.length > 0 ? (
                products.map((product: Product, i: number) => (
                  <Box
                    key={i}
                    transition="all 0.25s ease"
                    w="300px"
                    h="400px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    _hover={{
                      opacity: '0.8',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      w="100%"
                      h="60"
                    />

                    <Box p="6">
                      <Box
                        d="flex"
                        justifyContent="space-between"
                        alignItems="baseline"
                      >
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          Promo
                        </Badge>
                        {isFavorite(product) ? (
                          <MdFavorite
                            onClick={async () =>
                              user
                                ? setUserFavorites(product)
                                : history.push('/signIn')
                            }
                          />
                        ) : (
                          <MdFavoriteBorder
                            onClick={() =>
                              user
                                ? setUserFavorites(product)
                                : history.push('/signIn')
                            }
                          />
                        )}
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h2"
                        lineHeight="tight"
                        isTruncated
                      >
                        {product.name}
                      </Box>

                      <Box>{formatter.format(product.price)}</Box>

                      <Box d="flex" mt="2" alignItems="center">
                        {Array(5)
                          .fill('')
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              color={
                                i < product.rating ? 'teal.500' : 'gray.300'
                              }
                            />
                          ))}
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                          {product.reviewCount} reviews
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Flex w="100vw" justifyContent="center">
                  <Text fontSize="3xl">Product not Found</Text>
                </Flex>
              )}
            </SimpleGrid>

            <Pagination
              reference="products"
              handlePage={executeSearch}
              totalCountOfRegister={totalCount}
              currentPage={configs?.productCurrentPage}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}
