import { Flex, Button, Select } from '@chakra-ui/react';
import { Input } from './Form/Input';
import { useParams } from 'react-router-dom';
import { SearchOptions } from '../interfaces/SearchOptions.interface';

interface RouteParams {
  department: string;
}


interface FilterProps {
  searchField: string;
  setSearchField(field: string): void;
  setSearchValue(value: string): void;
  searchValue: string;
  searchFieldOptions: string[];
  searchSort: string;
  setSearchSort(sort: string);
  executeSearch(options:SearchOptions): void;
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
              department,
              field: `product.${searchField}`,
              value: searchValue,
              page:1,
           
          })
        }
      >
        Search
      </Button>
    </Flex>
  );
}
