import {  useState } from 'react';
import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import FavoriteItem from '../../components/FavoriteItem';
import { useFavorite } from '../../hooks/useFavorites';
import SearchFilters from '../../components/SearchFilters';


export default function Favorites() {
  const {
    favorites,
    favoritesTotalCount,
    searchFieldOptions,
    searchFavorite,
    isLoading,
  } = useFavorite();

  const [searchField, setSearchField] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchSort, setSearchSort] = useState<string>('');



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
        {!favorites  ? (
          <h1>No favorite found</h1>
        ) : (
          <>
            <FavoriteItem products={favorites} />
          </>
        )}
        <Pagination
        
          handlePage={searchFavorite}
          totalCountOfRegister={favoritesTotalCount}
        />
      </Flex>
    </>
  );
}
