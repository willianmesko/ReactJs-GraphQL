import { useEffect, useState } from 'react';
import {
  Flex,
  Select,
  IconButton,
  Icon,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoFilterSharp } from 'react-icons/io5';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { useApp } from '../../hooks/useContext';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { useSidebarDrawer } from '../../hooks/sideBarDrawerContext';
import { filterData } from '../../utils/filter';
import { orderData } from '../../utils/order';
import { Product } from '../../interfaces/Product.interface';
import { FavoriteItem } from '../../components/FavoriteItem';

export default function Favorites() {
  const { favorites, configs, setConfigs } = useApp();
  const [filtredProducts, setFiltredProducts] = useState<Product[]>(
    favorites.products,
  );
  const [isLoading, setLoading] = useState(false);
  const { onOpen } = useSidebarDrawer();
  const [totalCountOfRegister] = useState<number>(filtredProducts?.length);

  const filtredByLabel = (queryFilter: string) => {
    const [type, value] = queryFilter.split('?');
    return `${type.toUpperCase()} ${value.toUpperCase()}`;
  };
  async function searchFavorites() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setFiltredProducts(orderData(favorites?.products, configs?.favoritesOrder));

    setFiltredProducts(
      filterData(favorites?.products, configs?.favoritesQueryFilter),
    );

    setLoading(false);
  }

  useEffect(() => {
    searchFavorites();
  }, [
    configs?.favoritesQueryFilter,
    configs?.favoritesOrder,
    configs?.favoritesCurrentPage,
    favorites,
  ]);

  return (
    <>
      <Header />

      {favorites && favorites.products?.length > 0 && (
        <>
          <IconButton
            aria-label="Open Filters"
            icon={<Icon as={IoFilterSharp} />}
            fontSize="30"
            variant="unstyled"
            onClick={onOpen}
            ml="10"
          />

          <FilterBar reference="favorites" filters={favorites.filters} />
        </>
      )}

      <Flex w="100vw" align="center" justify="center" mt="5" flexDir="column">
        <Select
          w="200px"
          mr="60px"
          mb="10px"
          alignSelf="flex-end"
          placeholder="Order by"
          value={configs?.favoritesOrder}
          onChange={e =>
            setConfigs({
              ...configs,
              favoritesCurrentPage: 1,
              favoritesOrder: e.target.value,
            })
          }
        >
          <option value="lowerPrice">Lower price</option>
          <option value="higherPrice">Higher price</option>
        </Select>
        {isLoading && (
          <Stack>
            <Skeleton
              h="200px"
              w="900px"
              py={4}
              px={12}
              borderWidth="1px"
              borderRadius="lg"
            />
            <Skeleton
              h="200px"
              w="900px"
              py={4}
              px={12}
              borderWidth="1px"
              borderRadius="lg"
            />
            <Skeleton
              h="200px"
              w="900px"
              py={4}
              px={12}
              borderWidth="1px"
              borderRadius="lg"
            />
          </Stack>
        )}
        {!isLoading && (
          <>
            {favorites && favorites?.products?.length === 0 ? (
              <h1>No favorite found</h1>
            ) : (
              <>
                {configs?.favoritesQueryFilter && (
                  <Text fontWeight="bold" fontSize="3xl">
                    {filtredByLabel(configs?.favoritesQueryFilter)}
                  </Text>
                )}

                <FavoriteItem
                  setFiltredProducts={setFiltredProducts}
                  products={filtredProducts}
                />
              </>
            )}
          </>
        )}

        {filtredProducts.length > 0 && (
          <Pagination
            reference="favorites"
            totalCountOfRegister={totalCountOfRegister}
            currentPage={configs?.favoritesCurrentPage}
          />
        )}
      </Flex>
    </>
  );
}
