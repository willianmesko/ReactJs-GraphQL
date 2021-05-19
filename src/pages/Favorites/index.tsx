import { useEffect, useState } from 'react';
import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../hooks/useAuth';
import FavoriteItem from '../../components/FavoriteItem';
import { useFavorite } from '../../hooks/useFavorites';
import SearchFilters from '../../components/SearchFilters';

export default function FavoritesPage() {
  const { configs } = useAuth();
  const {
    favorites,
    favoritesTotalCount,
    getFavorites,
    searchFieldOptions,
    isLoading,
    searchFavorite,
  } = useFavorite();

  const [searchField, setSearchField] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchSort, setSearchSort] = useState<string>('');

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <Header />

      <Flex w="100vw" align="center" justify="center" mt="5" flexDir="column">
        <SearchFilters
          searchField={searchField}
          setSearchField={setSearchField}
          searchFieldOptions={searchFieldOptions}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchSort={searchSort}
          setSearchSort={setSearchSort}
          executeSearch={searchFavorite}
        />
        {isLoading && (
          <Stack>
            {Array(3).map(() => (
              <Skeleton
                h="200px"
                w="900px"
                py={4}
                px={12}
                borderWidth="1px"
                borderRadius="lg"
              />
            ))}
          </Stack>
        )}
        {favorites && favorites?.length === 0 ? (
          <h1>No favorite found</h1>
        ) : (
          <>
            <FavoriteItem products={favorites} />
          </>
        )}
        <Pagination
          reference="favorites"
          handlePage={() => {}}
          totalCountOfRegister={favoritesTotalCount}
          currentPage={configs?.favoritesCurrentPage}
        />
      </Flex>
    </>
  );
}
