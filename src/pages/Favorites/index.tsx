import { useEffect, useState } from 'react';
import { Flex, Stack, IconButton, Icon } from '@chakra-ui/react';
import { IoFilterSharp } from 'react-icons/io5';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { useApp } from '../../hooks/useContext';
import { paginationHelper } from '../../utils/pagination';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { useSidebarDrawer } from '../../hooks/sideBarDrawerContext';
import { filterData } from '../../utils/filter';
import { Product } from '../../interfaces/Product.interface';
import { FavoriteItem } from '../../components/FavoriteItem';

const per_page = 3;
export default function Favorites() {
  const {
    favorites: { products, filters },
    configs,
    removeFavorite,
  } = useApp();
  const [filtredProducts, setFiltredProducts] = useState<Product[]>([]);
  const { onOpen } = useSidebarDrawer();
  const [queryFilter, setQueryFilter] = useState<string>('');
  const [totalCountOfRegister] = useState<number>(
    products && products?.length > 0 ? products?.length : 0
  );

  function searchFavorites() {
    setFiltredProducts(filterData(products, queryFilter));
  }
  useEffect(() => {
    searchFavorites();
  }, [queryFilter]);

  return (
    <>
      <Header />
      {products.length > 0 && (
        <>
          <IconButton
            aria-label="Open Filters"
            icon={<Icon as={IoFilterSharp} />}
            fontSize="30"
            variant="unstyled"
            onClick={onOpen}
            ml="10"
          ></IconButton>

          <FilterBar setQueryFilter={setQueryFilter} filters={filters} />
        </>
      )}

      <Flex w="100vw" align="center" justify="center" mt="5" flexDir="column">
        {products.length === 0 ? (
          <h1>No favorite found</h1>
        ) : (
          <FavoriteItem
            products={filtredProducts.length > 0 ? filtredProducts : products}
          />
        )}

        {products && products?.length > 0 && (
          <Pagination
            who="favorites"
            totalCountOfRegister={totalCountOfRegister}
            currentPage={configs?.favoritesCurrentPage}
          />
        )}
      </Flex>
    </>
  );
}
