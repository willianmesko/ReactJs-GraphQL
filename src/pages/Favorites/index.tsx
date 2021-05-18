import { useEffect, useState } from 'react';
import { Flex, Select, Skeleton, Stack, Button } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../hooks/useAuth';
import { FavoriteItem } from '../../components/FavoriteItem';
import { useLazyQuery } from '@apollo/client';
import { LOAD_FAVORITES } from '../../GraphQL/favorite.queries';
import { useFavorite } from '../../hooks/useFavorites';
import { Input } from '../../components/Form/Input';
import { Product } from '../../interfaces/Product.interface';
export default function FavoritesPage() {
  const { configs } = useAuth();
  const {
    favorites,
    setFavorites,
    favoritesTotalCount,
    setFavoritesTotalCount,
  } = useFavorite();

  const [searchFieldOptions, setSearchFieldOptions] = useState<string[]>([]);
  const [searchField, setSearchField] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [searchSort, setSearchSort] = useState<string>();
  const [loading, setLoading] = useState(false)
  // const [executeSearch, { loading }] = useLazyQuery(LOAD_FAVORITES, {
  //   onCompleted(favoritesData) {
  //     setFavorites(favoritesData.favorites.data);

  //     setFavoritesTotalCount(favoritesData.favorites.totalCount);
  //     const favoriteList: string[] = [];

  //     favoritesData.favorites.data.map((favorite: Product[]) =>
  //       Object.keys(favorite).filter(fav =>
  //         fav !== 'id' &&
  //         fav !== 'imageUrl' &&
  //         fav !== '__typename' &&
  //         !favoriteList.includes(fav)
  //           ? favoriteList.push(fav)
  //           : '',
  //       ),
  //     );

  //     setSearchFieldOptions(favoriteList);
  //   },
  // });

  // useEffect(() => {
  //   executeSearch({
  //     variables: {
  //       field: setSearchField,
  //       value: setSearchValue,
  //       page: configs?.favoritesCurrentPage,
  //     },
  //   });
  // }, []);

  return (
    <>
      <Header />

      <Flex w="100vw" align="center" justify="center" mt="5" flexDir="column">
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
            // onClick={() =>
            //   executeSearch({
            //     variables: {
            //       field: `data.${searchField}`,
            //       value: searchValue,
            //       sort: searchSort,
            //     },
            //   })
            // }
          >
            Search
          </Button>
        </Flex>
        {false && (
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
          totalCountOfRegister={10}
          currentPage={configs?.favoritesCurrentPage}
        />
      </Flex>
    </>
  );
}
