import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  SimpleGrid,
  Image,
  Badge,
  Icon,
  IconButton,
  Skeleton,
  Select,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { MdFavorite } from 'react-icons/md';
import { IoFilterSharp } from 'react-icons/io5';
import { Header } from '../../components/Header';
import { productsApi } from '../../services/products.service';
import { Product } from '../../interfaces/Product.interface';
import { useApp } from '../../hooks/useContext';
import { Pagination } from '../../components/Pagination';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { useSidebarDrawer } from '../../hooks/sideBarDrawerContext';
import { Filter } from '../../interfaces/Filters.interface';

interface RouteParams {
  department: string;
}

export default function Products() {
  const { department } = useParams<RouteParams>();
  const {
    user, setFavorites, configs, setConfigs,
  } = useApp();
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);
  const { onOpen } = useSidebarDrawer();
  const [totalCountOfRegister, setTotalCountOfRegistes] = useState<number>(0);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setLoading] = useState(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  async function getProducts(): Promise<void> {
    setLoading(true);
    const response = await productsApi.getProducts(
      department,
      configs?.productCurrentPage,
      configs?.productsQueryFilter,
      configs?.productsOrder,
    );

    setProducts(response.products);
    setFilters(response.filters);
    setTotalCountOfRegistes(response.totalCount);
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, [configs?.productCurrentPage, configs?.productsQueryFilter, configs?.productsOrder]);

  return (
    <>
      <Header />
      {isLoading ? (
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
          <IconButton
            aria-label="Open Filters"
            icon={<Icon as={IoFilterSharp} />}
            fontSize="30"
            variant="unstyled"
            onClick={onOpen}
            ml="10"
          />

          <FilterBar reference="products" filters={filters} />
          <Flex
            w="100vw"
            mt="10"
            align="center"
            justify="center"
            flexDirection="column"
          >

            <Select
              w="200px"
              mr="60px"
              mb="10px"
              alignSelf="flex-end"
              placeholder="Order by"
              value={configs?.productsOrder}
              onChange={(e) => setConfigs({ ...configs, productCurrentPage: 1, productsOrder: e.target.value })}
            >
              <option value="lowerPrice">Lower price</option>
              <option value="higherPrice">Higher price</option>
            </Select>
            <SimpleGrid columns={3} spacing={20}>
              {products
                && products.map((product, i) => (
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
                        <Icon
                          onClick={() => (user
                            ? setFavorites(product, filters)
                            : history.push('/signIn'))}
                          as={MdFavorite}
                          w={5}
                          h={5}
                          color="with"
                        />
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
                          {product.reviewCount}
                          {' '}
                          reviews
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </SimpleGrid>
            {products.length >= 3 && (
              <Pagination
                reference="products"
                totalCountOfRegister={totalCountOfRegister}
                currentPage={configs?.productCurrentPage}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}
