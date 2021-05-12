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
import { SortOptionsEnum } from '../../utils/sort';
import { FavoriteItem } from '../../components/FavoriteItem';

export default function FavoritesPage() {
  const { configs, setConfigs, getFavorites, favorites } = useApp();
  const [isLoading, setLoading] = useState(false);
  const { onOpen } = useSidebarDrawer();
  const [totalCountOfRegister, setTotalCountOfRegister] = useState<number>(0);

  const filtredBy = (queryFilter: string) => {
    const [type, value] = queryFilter.split('?');
    return `${type.toUpperCase()} ${value.toUpperCase()}`;
  };

  async function awaitGetFavorites() {
    setLoading(true);

    const totalAccount = await getFavorites(
      configs.favoritesCurrentPage,
      configs.favoritesQueryFilter,
      configs.favoritesOrder,
    );
    setTotalCountOfRegister(totalAccount);
    setLoading(false);
  }

  useEffect(() => {
    awaitGetFavorites();
  }, [
    configs.favoritesCurrentPage,
    configs.favoritesQueryFilter,
    configs.favoritesOrder,
  ]);

  return (
    <>
      <Header />

      {favorites && favorites.products && favorites.products.length >= 0 && (
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
          placeholder="Sort by"
          value={configs?.favoritesOrder}
          onChange={e =>
            setConfigs({
              ...configs,
              favoritesCurrentPage: 1,
              favoritesOrder: e.target.value,
            })
          }
        >
          <option value={SortOptionsEnum.LOWERPRICE}>Price: Low to High</option>
          <option value={SortOptionsEnum.HIGHERPRICE}>
            Price: High to Low
          </option>
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
            {configs?.favoritesQueryFilter && (
              <Text fontWeight="bold" fontSize="3xl">
                {filtredBy(configs?.favoritesQueryFilter)}
              </Text>
            )}
            {favorites &&
            favorites.products &&
            favorites?.products?.length === 0 ? (
              <h1>No favorite found</h1>
            ) : (
              <>
                <FavoriteItem products={favorites?.products} />
              </>
            )}
          </>
        )}
        {favorites && favorites.products && favorites?.products.length >= 3 && (
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
