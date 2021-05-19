import { Flex, Button, Select } from '@chakra-ui/react';
import { Input } from './Form/Input';
import { QueryLazyOptions, OperationVariables } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { usePersist } from '../hooks/usePersist';

interface RouteParams {
  department: string;
}

interface FilterProps {
  searchField: string;
  setSearchField(field: string): void;
  setSearchValue(value: string): void;
  searchValue: string | number;
  searchFieldOptions: string[];
  searchSort: string;
  setSearchSort(sort: string);
  executeSearch(variables: QueryLazyOptions<OperationVariables>): void;
}

export default function SearchFilters({
  searchField,
  setSearchField,
  setSearchValue,
  searchValue,
  searchFieldOptions,
  searchSort,
  setSearchSort,
  executeSearch,
}: FilterProps) {
  const { department } = useParams<RouteParams>();
  const { persitSearchField, persistSearchValue, persistSearchSort } =
    usePersist();

  return (
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
        onChange={e => persistSearchValue(e.target.value, setSearchValue)}
      />
      <Select
        ml="10px"
        w="200px"
        mb="10px"
        placeholder="Field"
        value={searchField}
        onChange={e => persitSearchField(e.target.value, setSearchField)}
      >
        {searchFieldOptions &&
          searchFieldOptions.map((option, index) => (
            <option key={index} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
      </Select>

      <Select
        ml="10px"
        mb="10px"
        w="200px"
        placeholder="Sort"
        value={searchSort}
        onChange={e => persistSearchSort(e.target.value, setSearchSort)}
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
              department,
              field: `product.${searchField}`,
              value: searchValue,
              sort: searchSort,
            },
          })
        }
      >
        Search
      </Button>
    </Flex>
  );
}
